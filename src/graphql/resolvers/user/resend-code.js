import { authorize, authorizeNotVerified } from "../../../helpers/policies";
import handleError from "../../../helpers/handle-errors";
import User from "../../../models/user";
const resendCode = async (args, req) => {
  let user;
  switch (args.type) {
    case "VERIFICATION":
      authorizeNotVerified(req);
      user = req.User;
      return await user.createVerificationCode();
    case "PASSWORD":
      if (!args.email) {
        return handleError("no user found with the email specified", 400);
      }
      user = await User.findOne({ email: args.email });
      if (!user) {
        return handleError("no user found with the given email", 400);
      }
      return await user.createResetCode();
    default:
      return false;
  }
};

export { resendCode as default };
