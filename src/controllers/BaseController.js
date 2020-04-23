import { statusCode } from "../util/StatusCode";
import { hashSync } from "bcrypt";
import UserDAO from "../processors/UserProcessor";

class BaseController {
  constructor(dao) {
    this.dao = dao;
  }
  create = (req, res) => {
    if (this.dao instanceof UserDAO) {
      req.body.password = hashSync(req.body.password, 10);
    }
    var data = this.dao.save(req.body);
    data
      .then(function (result) {
        return res.json({ appCode: statusCode.success, data: result });
      })
      .catch(function (err) {
        return res.status(400).send({
          appCode: statusCode.generalError,
          message: err,
        });
      });
  };
}

export default BaseController;
