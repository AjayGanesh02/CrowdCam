import formidable from "formidable";
import {
  RekognitionClient,
  SearchFacesByImageCommand,
} from "@aws-sdk/client-rekognition";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({});
  form.parse(req, async (err, _fields, files) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    console.log(`parsed ${JSON.stringify(files)}`);

    const parsed = files["files"]![0];

    const rekogclient = new RekognitionClient(creds);

    const results = await rekogclient.send(
      new SearchFacesByImageCommand({
        CollectionId: "",
        Image: {
          Bytes: fs.readFileSync(parsed.filepath),
        },
      })
    );

    res.json({
      matches:
        results.FaceMatches?.map((match) => {
          return match.Face?.ExternalImageId!;
        }) || [],
    });
  });
}
