import { authorize, authorizeVerified } from "../../../helpers/policies";
import validate from "../../../helpers/validators/group-message/send-message";
import handleError from "../../../helpers/handle-errors";
import sanitizeString from "../../../helpers/data-sanitizers/sanitize-string";

const sendGroupMessage = async ({ data }, req) => {
  authorize(req);
  authorizeVerified(req);
  const { error } = validate(data);
  if (error) {
    return handleError(error.details[0].message, 400);
  }
  sanitizeString(data);
  const user = req.User;
  return await user.sendGroupMessage(data);
};

export { sendGroupMessage as default };
