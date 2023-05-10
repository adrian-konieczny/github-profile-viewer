import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../mongodb/connection";
import { ResponseFuncs } from "../../../mongodb/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const catcher = (error: Error) => res.status(400).json({ error });

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect();
      res.json(await User.find({}).catch(catcher));
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect();
      res.json(await User.create(req.body).catch(catcher));
    },
  };

  const response = handleCase[method];
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
