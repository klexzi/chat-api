import { authorizeNotVerified } from "../../../helpers/policies";
import handleErrors from "../../../helpers/handle-errors";

const verifyAccount = async (args, req) => {
  authorizeNotVerified(req);
  const user = req.User;
  return await user.verifyAccount(args.code);
};

export { verifyAccount as default };
