class BaseDAO {
  constructor(model) {
    this.model = model;
  }
  save = (json) => {
    const data = new this.model(json);
    return new Promise(function (resolve, reject) {
      data.save(function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

export default BaseDAO;
