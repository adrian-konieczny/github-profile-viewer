import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

export const connect = async () => {
  const conn = await mongoose
    .connect(MONGODB_URI as string)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");

  const UserSchema = new mongoose.Schema({
    name: String,
    likes: Number,
  });

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  return { conn, User };
};
