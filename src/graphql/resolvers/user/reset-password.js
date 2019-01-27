import User from "../../../models/user";
import validate from "../../../helpers/validators/user/reset-password";
import handleError from "../../../helpers/handle-errors";

const resetPassword = async args => {
  const { error } = validate(args);
  if (error) {
    return handleError(error.details[0].message, 400);
  }
  const { code, password, userId } = args;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return handleError("No user found", 404);
  }

  return await user.resetPassword(code, password);
};

export { resetPassword as default };
