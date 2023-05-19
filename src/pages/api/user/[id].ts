import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { fetchUserData } from "@/lib/utils/githubActions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id != "string") {
    return res.status(400).json({ error: "hallo id poprosze" });
  }
  const data = await fetchUserData(id);
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );
  res.status(200).json(data);
}
