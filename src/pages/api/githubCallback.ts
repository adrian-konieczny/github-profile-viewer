import type { NextApiRequest, NextApiResponse } from "next";
import { getGithubAccesToken, getGithubUser } from "@/lib/utils/githubActions";
import {
  createUser,
  findUserByEmail,
  updateUser,
} from "@/lib/mongodb/userActions";
import { createAuthCookie, createToken } from "@/lib/utils/verify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code;
  if (typeof code != "string") {
    return res.status(400).json({ error: "gzibie we dodaj kodzik" });
  }
  const access_token = await getGithubAccesToken(code);

  const { id, email } = await getGithubUser(access_token);

  const user = await findUserByEmail(email);

  if (!user) {
    await createUser({ email, id });
    const token = createToken({ email: email, github_id: id });
    res.setHeader("Set-Cookie", createAuthCookie(token)).status(200);
    res.redirect("/");
  }

  if (user) {
    if (!user.github_id) {
      await updateUser(email, { $set: { github_id: id } });
    }
    const token = createToken({ email: email, github_id: user.github_id });
    res.setHeader("Set-Cookie", createAuthCookie(token)).status(200);
  }

  res.redirect("/");
}
