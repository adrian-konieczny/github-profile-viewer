import clientPromise from "@/lib/mongodb/connection";
import { verifyAuth } from "@/lib/utils/verify";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = verifyAuth(req.cookies);
  if (email) {
    const client = await clientPromise;
    const db = client.db("Github-Profile-Viewer");

    const result = await db.collection("Users").findOne({
      email: email,
    });
    if (result) {
      return res
        .status(200)
        .json({ user: { email, favorite: result.favorite } });
    }
    return res.status(200).json({ user: { email } });
  }
  return res.status(401).json({ user: undefined });
}
