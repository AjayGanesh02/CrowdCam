import formidable from "formidable";
import {
  ListFacesCommand,
  ListUsersCommand,
  RekognitionClient,
  SearchFacesByImageCommand,
  SearchUsersByImageCommand,
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
        CollectionId: "SpartaHacks9",
        Image: {
          Bytes: fs.readFileSync(parsed.filepath),
        },
      })
    );

    // const UserIds = results.FaceMatches?.map((match) => {
    //   return match.Face.ExternalImageId;
    // });
    // res.json({
    //   matches: await rekogclient.send(
    //     new ListFacesCommand({
    //       CollectionId: "SpartaHacks9",
    //       UserId: JSON.stringify(UserIds),
    //     })
    //   ),

    return res.status(200).json({
      matches: results.FaceMatches?.map((match) => {
        return `https://crowdcamimages.s3.amazonaws.com/${match.Face
          ?.ExternalImageId!}`;
      }),
    });
  });
}
