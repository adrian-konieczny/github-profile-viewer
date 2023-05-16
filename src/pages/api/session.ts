import { verifyAuth } from "@/lib/utils/verify";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = verifyAuth(req.cookies);
  if (email) {
    return res.status(200).json({ user: { email } });
  }
  return res.status(401).json({ user: undefined });
}
