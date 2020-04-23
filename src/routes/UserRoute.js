import UserDAO from "../processors/UserProcessor";
import { UserModel } from "../models/UserModel";
import UserController from "../controllers/UserController";
import { tokenRequired } from "../util/CommonUtil";

var userDAO = new UserDAO(UserModel);
var userController = new UserController(userDAO);
const UserRoute = (app) => {
  app.route("/user/create").post(tokenRequired, userController.create);
};
export default UserRoute;
