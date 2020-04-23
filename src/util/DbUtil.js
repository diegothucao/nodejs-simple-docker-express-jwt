import mongoose from "mongoose";

class DbUtil {
  constructor() {}
  connect() {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  }
}
export const dbUtil = new DbUtil();
