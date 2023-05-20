import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "../../lib/utils/bcryptHash";
import { createUser, findUserByEmail } from "@/lib/mongodb/userActions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = JSON.parse(req.body);

  const user = await findUserByEmail(email);

  if (user) {
    return res.status(400).json({
      message: "User is already existing",
    });
  }
  const passwordHash = await hash(password);

  await createUser({ email, password: passwordHash });

  res.status(200).json({
    message: "User registered successfully",
  });
}
