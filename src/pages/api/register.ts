import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb/connection";
import { hash } from "../../lib/utils/bcryptHash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("Github-Profile-Viewer");
  const { email, password } = req.body;

  const result = await db.collection("Users").findOne({
    email: email,
  });

  if (result) {
    res.status(400).json({
      error: {
        message: "User is already existing",
      },
    });
  } else {
    const passwordHash = await hash(password);
    db.collection("Users").insertOne({
      email: email,
      password: passwordHash,
    });
    res.status(200).json({
      message: "User registered successfully",
    });
  }
}
