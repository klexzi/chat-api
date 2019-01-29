import handleError from "../../../helpers/handle-errors";
import sanitizeString from "../../../helpers/data-sanitizers/sanitize-string";
import { authorize, authorizeAdmin } from "../../../helpers/policies";
import validate from "../../../helpers/validators/group/create";

const createGroup = async ({ data }, req) => {
  authorize(req);
  authorizeAdmin(req);
  sanitizeString(data);
  const { error } = validate(data);
  if (error) {
    return handleError(error.details[0].message, 400);
  }

  const user = req.User;
  return await user.createGroup(data);
};

export { createGroup as default };
