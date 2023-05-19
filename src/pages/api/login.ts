import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { findUserByEmail } from "@/lib/mongodb/userActions";
import { createAuthCookie, createToken } from "@/lib/utils/verify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = JSON.parse(req.body);

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "we ty wypelnij tam ten meial i haslao gzibie" });
  }

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Password is invalid",
    });
  }
  const token = createToken({ email: email, github_id: user.github_id });
  res.setHeader("Set-Cookie", createAuthCookie(token)).status(200).json({
    message: "Logged in successfuly",
  });
}
