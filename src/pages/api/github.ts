import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const client_id = process.env.CLIENT_ID;

  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user`
  );
}
