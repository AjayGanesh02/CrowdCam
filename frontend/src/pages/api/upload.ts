import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { formidable } from "formidable";
import fs from "fs";

// export const main = async () => {
//   const command = new PutObjectCommand({
//     Bucket: "test-bucket",
//     Key: "hello-s3.txt",
//     Body: "Hello S3!",
//   });

//   try {
//     const response = await client.send(command);
//     console.log(response);
//   } catch (err) {
//     console.error(err);
//   }
// };

type ResponseData = {
  message: string;
};

export const config = {
  api: {
    // bodyParser: {
    //     sizeLimit: '10mb'
    // }
    bodyParser: false,
  },
};

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const form = formidable({});
  // await new Promise((resolve, reject) => {
  form.parse(request, async (err, _fields, files) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    console.log(`parsed ${JSON.stringify(files)}`);
    const client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });

    const filearray = files["files"];
    console.log(filearray);
    await Promise.all(
      (filearray || []).map(async (file) => {
        console.log("file 1: " + file.filepath);
        const fileStream = fs.createReadStream(file.filepath);

        const params = {
          Bucket: "arn:aws:s3:::crowdcamimages",
          Key: `uploads/${file.newFilename}`,
          Body: fileStream,
        };

        const command = new PutObjectCommand(params);

        return client.send(command);
      })
    );
    res.status(200).send({ message: "uploaded" });
    // } catch (error) {
    //   // Handle the error
    // }
    // }
  });
}

// const { filename, contentType, eventId } = await request.json();
// res.status(200).json({message: "ur mom"});

// try {
//     const client = new S3Client({ region: process.env.AWS_REGION });
//     // const { url, fields } = await createPresignedPost(client, {
//     //   Bucket: process.env.AWS_BUCKET_NAME || "",
//     //   Key: Date.now() + "-" + eventId,
//     //   Conditions: [
//     //     ["content-length-range", 0, 10485760], // up to 10 MB
//     //     ["starts-with", "$Content-Type", contentType],
//     //   ],
//     //   Fields: {
//     //     acl: "public-read",
//     //     "Content-Type": contentType,
//     //   },
//     //   Expires: 600, // Seconds before the presigned post expires. 3600 by default.
//     // });

//     // return Response.json({ url, fields });
// } catch (error: any) {
//     return Response.json({ error: error.message });
// }
