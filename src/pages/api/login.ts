import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb/connection";
import { compare } from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.cookies);

  const client = await clientPromise;
  const db = client.db("Github-Profile-Viewer");
  const { email, password } = JSON.parse(req.body);
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "we ty wypelnij tam ten meial i haslao gzibie" });
  }
  const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;

  const result = await db.collection("Users").findOne({
    email: email,
  });

  if (result) {
    const isPasswordValid = await compare(password, result.password);
    if (isPasswordValid && JWT_TOKEN_KEY) {
      const token = jwt.sign(
        { email: email, github_id: result.github_id },
        JWT_TOKEN_KEY,
        {
          expiresIn: "1d",
        }
      );
      res
        .setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 60 * 60,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
          })
        )
        .status(200)
        .json({
          message: "Logged in successfuly",
          user: email,
          github_id: result.github_id,
        });
    } else {
      res.status(400).json({
        message: "Password is invalid",
      });
    }
  } else {
    res.status(400).json({
      message: "User not found",
    });
  }
}
