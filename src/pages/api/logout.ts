import type { NextApiRequest, NextApiResponse } from "next";
import { clearAuthCookie } from "@/lib/utils/verify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Set-Cookie", clearAuthCookie());
  res.redirect("/");
}
