import * as bcrypt from "bcryptjs";

import validate from "../../../helpers/validators/user/login";
import User from "../../../models/user";
import handleError from "../../../helpers/handle-errors";

const login = async args => {
  const { error } = validate(args);
  if (error) {
    return handleError(error.details[0].message, 400);
  }

  const { email, password } = args;
  const user = await User.findOne({ email });
  if (!user) {
    return handleError("invalid email or password", 406);
  }

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    return handleError("invalid email or password", 406);
  } else {
    let token = user.generateAuthToken();
    let userObject = user.toObject();
    return token;
  }
};

export { login as default };
