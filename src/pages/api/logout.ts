import type { NextApiResponse } from "next";
import { clearAuthCookie } from "@/lib/utils/verify";

export default async function handler(res: NextApiResponse) {
  res.setHeader("Set-Cookie", clearAuthCookie());
  res.redirect("/");
}
