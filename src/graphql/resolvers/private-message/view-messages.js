import { authorize, authorizeVerified } from "../../../helpers/policies";
import validate from "../../../helpers/validators/private-message/view-messages";
import handleError from "../../../helpers/handle-errors";

const privateMessageHistory = async ({ where, paginate }, req) => {
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
  return await user.privateMessages(where, options);
};

export { privateMessageHistory as default };
