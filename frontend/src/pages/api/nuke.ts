import { NextApiRequest, NextApiResponse } from "next";
import {
  DeleteCollectionCommand,
  RekognitionClient,
} from "@aws-sdk/client-rekognition";

const creds = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
};

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  const client = new RekognitionClient(creds);

  client.send(
    new DeleteCollectionCommand({
      CollectionId: "SpartaHacks9",
    })
  );

  res.send("done");
}
