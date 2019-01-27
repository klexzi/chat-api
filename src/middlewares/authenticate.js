import jwt from "jsonwebtoken";

import User from "../models/user";
import { WORKCHAT_JWT_KEY } from "../utils/secrets";
import handleErrors from "../helpers/handle-errors";

const authenticate = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next();
  }

  const token = req.headers["authorization"].split(" ")[1];
  let user;
  try {
    user = jwt.verify(token, WORKCHAT_JWT_KEY);
  } catch (error) {
    req.isAuthenticated = false;
    return next();
  }
  if (!user) {
    req.isAuthenticated = false;
    return next();
  }
  User.findOne({ _id: user.userId })
    .select("-password ")
    .then(user => {
      req.isAuthenticated = true;
      req.User = user;
      return next();
    })
    .catch(reason => {
      req.isAuthenticated = false;
      return next();
    });
};

export { authenticate as default };
