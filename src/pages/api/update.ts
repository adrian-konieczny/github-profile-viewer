import type { NextApiRequest, NextApiResponse } from "next";
import { updateUser } from "@/lib/mongodb/userActions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, login, action, avatar } = JSON.parse(req.body);

  if (action == "add") {
    await updateUser(email, { $push: { favorite: { login, avatar } } });
  } else if (action == "remove") {
    await updateUser(email, { $pull: { favorite: { login, avatar } } });
  } else {
    return res.status(400).json({
      message: "Wrong action type",
    });
  }

  res.status(200).json({
    message: "User updated successfully",
  });
}
