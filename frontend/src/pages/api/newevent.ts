import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import { EventType } from "../events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newEvent: EventType = req.body;

  await kv.json.arrappend("events", "$", newEvent);

  res.status(200).json({ message: "created" });
}
