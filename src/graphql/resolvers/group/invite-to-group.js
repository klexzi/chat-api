import { authorize, authorizeAdmin } from "../../../helpers/policies";
import sanitizeString from "../../../helpers/data-sanitizers/sanitize-string";
import validate from "../../../helpers/validators/group/invite-to-group";
import handleError from "../../../helpers/handle-errors";

const inviteToGroup = async ({ data }, req) => {
  authorize(req);
  authorizeAdmin(req);
  sanitizeString(data);
  const { error } = validate(data);
  if (error) {
    return handleError(error.details[0].message, 400);
  }
  const user = req.User;
  return await user.inviteToGroup(data);
};

export { inviteToGroup as default };
