import clientPromise from "./connection";

export const findUserByEmail = async (email: string) => {
  const db = (await clientPromise).db("Github-Profile-Viewer");
  const result = await db.collection("Users").findOne({
    email,
  });

  return result;
};

export const createUser = async (options: {
  email: string;
  id?: string;
  password?: string;
}) => {
  const db = (await clientPromise).db("Github-Profile-Viewer");
  const { email, id, password } = options;
  db.collection("Users").insertOne({
    email: email,
    password: password,
    github_id: id,
    favorite: [],
  });
};

export const updateUser = async (email: string, options: any) => {
  const db = (await clientPromise).db("Github-Profile-Viewer");
  await db.collection("Users").updateOne(
    {
      email,
    },
    options
  );
};
