import { authorizeVerified, authorize } from "../../../helpers/policies";
import validate from "../../../helpers/validators/user/change-password";
import handleError from "../../../helpers/handle-errors";

const changePassword = ({ oldPassword, newPassword }, req) => {
  authorize(req);
  authorizeVerified(req);
  const { error } = validate({ oldPassword, newPassword });
  if (error) {
    return handleError(error.details[0].message, 400);
  }
  const user = req.User;
  return user.changePassword(oldPassword, newPassword);
};

export { changePassword as default };
