import BaseDAO from "./BaseDAO";
import { UserModel } from "../models/UserModel";
import { verify } from "jsonwebtoken";

class UserDAO extends BaseDAO {
  constructor(model) {
    super(model);
  }
  getByEmail = (email) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        email: email,
      }).exec((err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  };
  extractRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
      verify(refreshToken, process.env.HASKEY, (err, decode) => {
        if (err) {
          reject(err);
        } else {
          UserModel.findOne(
            {
              email: decode.email,
            },
            (err, user) => {
              if (err) {
                reject(err);
              } else {
                resolve(user);
              }
            }
          );
        }
      });
    });
  };
}
export default UserDAO;
