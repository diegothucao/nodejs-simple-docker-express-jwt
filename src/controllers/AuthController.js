import BaseController from "./BaseController";
import { UserModel } from "../models/UserModel";
import UserDAO from "../processors/UserProcessor";
import { statusCode } from "../util/StatusCode";
import { generateTokenFromJson } from "../util/CommonUtil";
import { validationResult } from "express-validator";

class AuthController extends BaseController {
  constructor(dao) {
    super(dao);
  }
  login(req, res) {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors) {
      return res.status(422).send(result);
    }
    var userDAO = new UserDAO(UserModel);
    var user = userDAO.getByEmail(req.body.email);
    user
      .then((user) => {
        if (user) {
          if (user.compareCode(req.body.password, user.password) === true) {
            let code = generateTokenFromJson({ email: user.email });
            return res.json({
              apiCode: statusCode.success,
              tonkenInfo: code,
              data: user,
            });
          } else {
            return res.status(401).send({
              apiCode: statusCode.generalError,
              message: "Invalid email or password",
            });
          }
        } else {
          return res.status(401).send({
            apiCode: statusCode.generalError,
            message: "Invalid email or password",
          });
        }
      })
      .catch((_) => {
        return res.status(400).send({
          apiCode: statusCode.generalError,
          message: "Cannot login",
        });
      });
  }
}

export const authController = new AuthController();
