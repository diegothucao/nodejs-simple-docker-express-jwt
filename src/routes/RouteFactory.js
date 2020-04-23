import AuthRoute from "./AuthRoute";
import UserRoute from "./UserRoute";

export const RouteFactory = (app) => {
  AuthRoute(app);
  UserRoute(app);
};

export default RouteFactory;
