import { authController } from "../controllers/AuthController";

const AuthRoute = (app) => {
  app.route("/auth/login").post(authController.login);
};
export default AuthRoute;
