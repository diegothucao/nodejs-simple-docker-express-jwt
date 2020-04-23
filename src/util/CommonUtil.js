import { statusCode } from "./StatusCode";
import UserDAO from "../processors/UserProcessor";
import { UserModel } from "../models/UserModel";
import { format } from "date-and-time";
import { sign } from "jsonwebtoken";
import { appSetting } from "./AppSetting";

export const tokenRequired = (req, res, next) => {
  if (process.env.IS_SECURED === true) {
    if (req.refreshToken) {
      var userDAO = new UserDAO(UserModel);
      var userData = userDAO.extractRefreshToken(req.refreshToken);
      userData
        .then((_) => {
          next();
        })
        .catch((_) => {
          return res.status(401).send({
            apiCode: statusCode.generalError,
            message: "The token does not map user",
          });
        });
    } else {
      return res.status(401).send({
        apiCode: statusCode.generalError,
        message: "Do not find the token",
      });
    }
  } else {
    next();
  }
};

export const generateTokenFromJson = (json) => {
  let refreshToken = sign(json, process.env.HASKEY);
  let token =
    process.env.TOKEN_EXPIRED_TIME <= 0
      ? sign({ refreshToken: refreshToken }, process.env.HASKEY)
      : sign(
          {
            refreshToken: refreshToken,
          },
          process.env.HASKEY,
          { expiresIn: process.env.TOKEN_EXPIRED_TIME * 60 }
        );
  let result = {
    token: token,
    refreshToken: refreshToken,
    created: format(new Date(), appSetting.defaultDateFormat),
    expiresIn: process.env.TOKEN_EXPIRED_TIME * 60,
  };
  return result;
};
