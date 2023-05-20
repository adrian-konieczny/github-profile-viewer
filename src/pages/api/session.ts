import { findUserByEmail } from "@/lib/mongodb/userActions";
import { verifyAuth } from "@/lib/utils/verify";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = verifyAuth(req.cookies);
  if (!email) {
    return res.status(401).json({ user: undefined });
  }

  const user = await findUserByEmail(email);
  if (user) {
    return res.status(200).json({ user: { email, favorite: user.favorite } });
  }
  return res.status(200).json({ user: { email } });
}
