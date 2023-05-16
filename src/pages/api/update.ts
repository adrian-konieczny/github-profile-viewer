import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb/connection";
import { hash } from "../../lib/utils/bcryptHash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("Github-Profile-Viewer");
  const { email, name, action } = JSON.parse(req.body);
  if (action == "add") {
    await db.collection("Users").updateOne(
      {
        email: email,
      },
      { $push: { favorite: name } }
    );
  } else if (action == "remove") {
    await db.collection("Users").updateOne(
      {
        email: email,
      },
      { $pull: { favorite: name } }
    );
  } else {
    return res.status(400).json({
      message: "Wrong action type",
    });
  }

  res.status(200).json({
    message: "User updated successfully",
  });
}
