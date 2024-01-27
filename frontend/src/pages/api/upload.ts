import fs from 'fs-extra';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const form = new formidable.IncomingForm();
  }

}
