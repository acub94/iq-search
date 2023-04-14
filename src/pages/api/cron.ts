import { refreshEmbeddings } from "@/modules/refreshEmbeddings";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  await refreshEmbeddings();
  res.send("OK");
}