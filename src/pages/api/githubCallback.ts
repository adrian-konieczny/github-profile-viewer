import clientPromise from "@/lib/mongodb/connection";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const code = req.query.code;

  const response = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const json = await response.json();

  console.log(json);

  const { access_token } = json;

  const user_res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: "token " + access_token,
    },
  });
  const { id } = await user_res.json();
  const emails_res = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const emails_data = await emails_res.json();
  console.log(emails_data);
  const primary_email = emails_data.find((e: { primary: boolean }) => {
    return e.primary;
  });
  console.log(primary_email);
  const email = primary_email.email;
  const client = await clientPromise;
  const db = client.db("Github-Profile-Viewer");
  const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;

  const result = await db.collection("Users").findOne({
    email,
  });
  if (result && JWT_TOKEN_KEY) {
    if (!result.github_id) {
      await db.collection("Users").updateOne(
        {
          email: email,
        },
        { $set: { github_id: id } }
      );
    }
    const token = jwt.sign(
      { email: email, github_id: result.github_id },
      JWT_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );
    res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          maxAge: 60 * 60,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          path: "/",
        })
      )
      .status(200);
  } else if (JWT_TOKEN_KEY) {
    db.collection("Users").insertOne({
      email: email,
      password: "",
      github_id: id,
      favorite: [],
    });

    const token = jwt.sign({ email: email, github_id: id }, JWT_TOKEN_KEY, {
      expiresIn: "1d",
    });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      })
    );
  }
  res.redirect("/");
}
