import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  RekognitionClient,
  IndexFacesCommand,
  ListCollectionsCommand,
  CreateCollectionCommand,
} from "@aws-sdk/client-rekognition";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

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
    const eventid = fields["eventId"][0];
    const filearray = files["files"];
    const bucket = "crowdcamimages";

    await checkAndCreateCollection(eventid);

    await Promise.all(
      filearray.map(async (file) => {
        const filekey = `${file.newFilename}${file.originalFilename}`;
        await uploadToS3(bucket, file.filepath, filekey);
        return indexFaces(eventid, {
          Bucket: bucket,
          Name: filekey,
        });
      })
    );

    return res.status(200).json({ message: "finished uploading" });

    async function uploadToS3(bucket: string, filepath: string, key: string) {
      const fileBuf = fs.readFileSync(filepath);
      const params = {
        Bucket: bucket,
        Key: key,
        Body: fileBuf,
      };
      try {
        const data = await client.send(new PutObjectCommand(params));
        // console.log("File uploaded successfully, etag: ", data.ETag);
        // await indexFaces(eventid, {Bucket: bucket, Name: key})
      } catch (error) {
        console.error("Error uploading file to S3:", error);
      }
    }

    async function indexFaces(
      eventId: string,
      S3image: { Bucket: string; Name: string }
    ) {
      try {
        const params = {
          CollectionId: eventId,
          ExternalImageId: S3image.Name,
          Image: {
            S3Object: S3image,
          },
        };

        const { FaceRecords } = await rekogclient.send(
          new IndexFacesCommand(params)
        );
        if (FaceRecords && FaceRecords.length > 0) {
          console.log(
            `Faces indexed for ${S3image.Name}: ${JSON.stringify(
              FaceRecords.map((faceRecord) => {
                return {
                  id: faceRecord.Face?.FaceId,
                  s3: faceRecord.Face?.ExternalImageId,
                };
              })
            )}`
          );
        } else {
          console.log(`No faces found for ${S3image.Name}.`);
        }
        return FaceRecords;
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function checkAndCreateCollection(eventId: string) {
      try {
        const { CollectionIds } = await rekogclient.send(
          new ListCollectionsCommand({})
        );

        if (CollectionIds && CollectionIds.includes(eventId)) {
          console.log("Collection already exists:", eventId);
          // Perform operations related to the existing collection
          // index incoming images and add to collection
        } else {
          // Collection does not exist, create it
          await createCollection(eventId);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function createCollection(eventId: string) {
      try {
        await rekogclient.send(
          new CreateCollectionCommand({ CollectionId: eventId })
        );
        console.log("Collection created:", eventId);
        // Perform operations related to the newly created collection
      } catch (error) {
        console.error("Error creating collection:", error);
      }
    }
  });
  return res.send({ message: "uploaded" });
}
