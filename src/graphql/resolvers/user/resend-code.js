import { authorize, authorizeNotVerified } from "../../../helpers/policies";

const resendCode = async (args, req) => {
  authorize(req);
  const user = req.User;
  switch (args.type) {
    case "VERIFICATION":
      authorizeNotVerified(req);
      return await user.createVerificationCode();
    case "PASSWORD":
      return await user.createResetCode();
    default:
      return false;
  }
};

export { resendCode as default };
