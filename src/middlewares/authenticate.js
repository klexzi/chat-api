import jwt from "jsonwebtoken";

import User from "../models/user";
import { WORKCHAT_JWT_KEY } from "../utils/secrets";
import handleErrors from "../helpers/handle-errors";

const authenticate = async (req, res, next) => {
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
  const authenticatedUser = await User.findOne({ _id: user.userId });
  if (!authenticatedUser) {
    req.isAuthenticated = false;
    return next();
  } else {
    req.isAuthenticated = true;
    req.User = authenticatedUser;
    return next();
  }
};

export { authenticate as default };
