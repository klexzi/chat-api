import { authorize, authorizeVerified } from "../../../helpers/policies";
import validate from "../../../helpers/validators/group-message/view-messages";
import handleError from "../../../helpers/handle-errors";

const groupMessageHistory = async ({ where, paginate }, req) => {
  authorize(req);
  authorizeVerified(req);
  const { error } = validate(where);
  if (error) return handleError(error.details[0].message, 400);
  let options = {
    page: paginate.page ? parseInt(paginate.page, 10) : 1,
    limit: paginate.limit ? parseInt(paginate.limit, 10) : 20,
    sort: { createdAt: -1 }
  };
  const user = req.User;
  return await user.groupMessages(where, options);
};

export { groupMessageHistory as default };
