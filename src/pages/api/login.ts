import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb/connection";
import { compare } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("Github-Profile-Viewer");
  const { email, password } = JSON.parse(req.body);

  const result = await db.collection("Users").findOne({
    email: email,
  });

  if (result) {
    const isPasswordValid = await compare(password, result.password);
    if (isPasswordValid) {
      res.status(200).json({
        message: "Logged in successfuly",
        user: email,
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
