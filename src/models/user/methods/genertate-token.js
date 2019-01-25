import jwt from "jsonwebtoken";
import logger from "../../../utils/logger";

import { WORKCHAT_JWT_KEY } from "../../../utils/secrets";

const generateAuthToken = Schema => {
  Schema.methods.generateAuthToken = function(Schema) {
    let userAuth = {
      userId: this._id,
      organizationId: this.organization
    };
    const token = jwt.sign(userAuth, WORKCHAT_JWT_KEY, { expiresIn: "5days" });
    logger.debug(token);
    userAuth.token = token;

    return userAuth;
  };
};

export { generateAuthToken as default };
