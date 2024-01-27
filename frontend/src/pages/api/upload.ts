import fs from 'fs-extra';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading file.' });
      }

      const { image } = files;

      if (!image) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      const fileName = image.name;
      const filePath = `public/uploads/${fileName}`;

      await fs.move(image.path, filePath);

      return res.status(200).json({ success: true, filePath });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
