import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  RekognitionClient,
  IndexFacesCommand,
  ListCollectionsCommand,
  CreateCollectionCommand,
} from "@aws-sdk/client-rekognition";
import { NextApiRequest, NextApiResponse } from "next";
import { formidable } from "formidable";
import fs from "fs";

// each uploaded image
// index it for an array of face ids
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
    const eventid = "SpartaHacks9";
    const filearray = files["files"];
    console.log(filearray);
    const uploaded = await Promise.all(
      (filearray || []).map(async (file) => {
        console.log("file 1: " + file.filepath);
        const fileStream = fs.createReadStream(file.filepath);

        const params = {
          Bucket: "arn:aws:s3:::crowdcamimages",
          Key: `${eventid}/${file.newFilename}`,
          Body: fileStream,
        };

        const command = new PutObjectCommand(params);

        return client.send(command);
      })
    );

    const rekogclient = new RekognitionClient(creds);

    const find = new ListCollectionsCommand({});

    const { CollectionIds } = await rekogclient.send(find);

    const create = new CreateCollectionCommand({
      CollectionId: eventid,
    });

    await rekogclient.send(create);

    res.status(200).send({ message: "uploaded" });
  });
}
