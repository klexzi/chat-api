import { authorize, authorizeVerified } from "../../../helpers/policies";

const contacts = async (args, req) => {
  authorize(req);
  authorizeVerified(req);
  const user = req.User;

  return await user.contacts();
};

export { contacts as default };
