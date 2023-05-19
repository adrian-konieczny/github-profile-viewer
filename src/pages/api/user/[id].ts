import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const response = await fetch(`https://api.github.com/users/${id}`);
  const data = await response.json();

  const repores = await fetch(`https://api.github.com/users/${id}/repos`);
  const repodata = await repores.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );
  res.status(200).json({ data, repodata });
}
