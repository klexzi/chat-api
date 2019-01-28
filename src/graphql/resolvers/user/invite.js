import { authorizeAdmin, authorize } from "../../../helpers/policies";

const invite = async ({ email }, req) => {
  authorize(req);
  authorizeAdmin(req);
  const user = req.User;
  return await user.invite(email);
};

export { invite as default };
