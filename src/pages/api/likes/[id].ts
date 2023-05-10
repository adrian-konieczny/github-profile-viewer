import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../mongodb/connection";
import { ResponseFuncs } from "../../../mongodb/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const catcher = (error: Error) => res.status(400).json({ error });

  const id: string = req.query.id as string;

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect();
      res.json(await User.findById(id).catch(catcher));
    },
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect();
      res.json(
        await User.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
      );
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect();
      res.json(await User.findByIdAndRemove(id).catch(catcher));
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
