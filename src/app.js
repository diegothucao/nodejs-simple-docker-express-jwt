import cors from "cors";
import { urlencoded, json } from "body-parser";
import dotenv from "dotenv";
import http from "http";
import express from "express";
import { statusCode } from "./util/StatusCode";
import { verify } from "jsonwebtoken";
import { dbUtil } from "./util/DbUtil";
import RouteFactory from "./routes/RouteFactory";

dotenv.load();
var app = require("express")();
const api = express.Router();
app.use(urlencoded({ extended: true, limit: "500mb" }));
app.use(json({ extended: true, limit: "500mb" }));
app.use(cors());
dbUtil.connect();
// JWT setup
app.use((req, res, next) => {
  if (Boolean(JSON.parse(process.env.IS_SECURED)) === true) {
    if (req.headers.appkey === process.env.APP_KEY) {
      if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] ===
          process.env.AUTHORIZATION_PREFIX
      ) {
        verify(
          req.headers.authorization.split(" ")[1],
          process.env.HASKEY,
          (err, decode) => {
            if (err) {
              return res.status(401).send({
                apiCode: statusCode.generalError,
                message: "Token is invalid",
              });
            } else {
              req.refreshToken = decode.refreshToken;
              next();
            }
          }
        );
      } else {
        req.refreshToken = undefined;
        next();
      }
    } else {
      return res.status(401).send({
        apiCode: statusCode.generalError,
        message: "Not alow this request",
      });
    }
  } else {
    next();
  }
});

app.get("/", (_, res) => {
  res.send("Running");
});

app.use("/api", api);
RouteFactory(api);
// our server instance
const server = http.createServer(app);
server.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
