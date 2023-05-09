import mongoose from "mongoose";

export const main = async () => {
  mongoose.connect(
    "mongodb+srv://admin:UhBnjYwCunPstXes@github-profile-viewer.uaxxp8r.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Database Connected.");
};
