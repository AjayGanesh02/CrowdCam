import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  RekognitionClient,
  IndexFacesCommand,
  ListCollectionsCommand,
  CreateCollectionCommand,
  ListUsersCommand,
  AssociateFacesCommand,
  S3Object,
  FaceRecord,
  CreateUserCommand,
} from "@aws-sdk/client-rekognition";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { S3ObjectMetadata } from "aws-sdk/clients/s3control";
import { createSecureServer } from "http2";

// each uploaded image
// index it for an array of face objects
// foreach existing user id in the collection run associate faces on the return value of the index
// repeat for all unsuccessfulfaceassociations (use reasons) - parse into normal array of faceids and run against next userid in collection
// at the end, array of userids remaining, create a new user for each one

type ResponseData = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const creds = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
};

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const form = formidable({});
  form.parse(request, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    console.log(`parsed ${JSON.stringify(files)}`);


    const client = new S3Client(creds);
    const rekogclient = new RekognitionClient(creds);
    const eventid = "SpartaHacks9";
    const filearray = files["files"];
    const bucket = "arn:aws:s3:::crowdcamimages"

    await checkAndCreateCollection(eventid);
    console.log(filearray);

    (filearray || []).forEach(async (file) => {
        const filekey = `${eventid}/${file.newFilename}${file.originalFilename}`
        await uploadToS3(bucket, file.filepath, filekey);
        const faceRecords = await indexFaces(bucket, { Bucket: bucket, Name: filekey})
        const faceIds = faceRecords?.map((faceRecord) => {return faceRecord.Face?.FaceId ?? "FUCKYOU"});
        if (!faceIds) return;

        const userIds = await listUsers(eventid);

        if (!userIds) {
            await Promise.all(faceIds.map((faceId) => {
                return createUser(eventid, faceId);
            }));
        } else {
            let assocReturns = await Promise.all(userIds.map((userId) => {
                return associateFaces(eventid, userId, faceIds);
            }));
            assocReturns = assocReturns.filter(element => element !== undefined)!;

            let unassocFaceIds: Set<string> = new Set();
            for (const { UnsuccessfulFaceAssociations } of assocReturns) {
                for (const failedAssoc of UnsuccessfulFaceAssociations) {
                    unassocFaceIds.add(failedAssoc.FaceId);
                }
            }

            await Promise.all(Array.from(unassocFaceIds).map((faceId) => {
                return createUser(eventid, faceId);
            }));
        }
        // get list of users in collection
        // for each user, try to associate faces to users, using unsuccessfulassociates for the next user
        // create new users for each face left after running through all users
    });

    async function createUser(CollectionId: string, UserId: string) {
        try {
            await rekogclient.send(new CreateUserCommand({CollectionId, UserId}));
        } catch (error) {
            console.error('Error creating user:', error)
        }
    }

    async function associateFaces(CollectionId: string, UserId: string, FaceIds: string[]) {
        try {
            const params = {
                CollectionId, UserId, FaceIds
            }
            return await rekogclient.send(new AssociateFacesCommand(params));
        } catch (error) {
            console.error("Error associating faces:", error)
        }
    }

    async function listUsers(CollectionId: string) {
        try {
            // Execute the ListFaces command to get a list of users in the collection
            const data = await rekogclient.send(new ListUsersCommand({
                CollectionId,
            }));
        
            // Log the list of faces
            if (data.Users && data.Users.length > 0) {
              const userIds = data.Users.map((user) => user.UserId ?? "WHEREISYOURUSERID");
              console.log('Users in collection:', userIds);
              return userIds;
            } else {
              console.log('No users found in the collection.');
              return [];
            }
          } catch (error) {
            // Log any errors that occur during the operation
            console.error('Error listing faces in collection:', error);
          }
    }

    async function uploadToS3(bucket:string, filepath: string, key: string) {
        const fileBuf = fs.readFileSync(filepath);
        const params = {
          Bucket: bucket,
          Key: key,
          Body: fileBuf,
        };
        try {
            const data = await client.send(new PutObjectCommand(params));
            console.log("File uploaded successfully, etag: ", data.ETag);
            // await indexFaces(eventid, {Bucket: bucket, Name: key})
        } catch (error) {
            console.error('Error uploading file to S3:', error);
        }

    }

    async function indexFaces(eventId: string, S3image: {Bucket: string, Name: string}) {
        try {
            const params = {
                "CollectionId": eventId,
                "ExternalImageId": S3image.Name,
                "Image": {
                    "S3Object": S3image
                }
            }

            const { FaceRecords } = await rekogclient.send(new IndexFacesCommand(params));
            if (FaceRecords && FaceRecords.length > 0) {
                console.log(`Faces indexed for ${S3image.Name}:`);
              } else {
                console.log(`No faces found for ${S3image.Name}.`);
            }
            return FaceRecords;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function checkAndCreateCollection(eventId : string) {
      try {
        const { CollectionIds } = await rekogclient.send(new ListCollectionsCommand({}));
    
        if (CollectionIds && CollectionIds.includes(eventId)) {
          console.log('Collection already exists:', eventId);
          // Perform operations related to the existing collection
          // index incoming images and add to collection
          
        } else {
          // Collection does not exist, create it
          await createCollection(eventId);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
    async function createCollection(eventId: string) {
      try {
        await rekogclient.send(new CreateCollectionCommand({ CollectionId: eventId }));
        console.log('Collection created:', eventId);
        // Perform operations related to the newly created collection
      } catch (error) {
        console.error('Error creating collection:', error);
      }
    }

    res.status(200).send({ message: "uploaded" });
  });
}