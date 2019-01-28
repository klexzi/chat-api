import bcrypt from "bcryptjs";

import logger from "../../../utils/logger";
import handleError from "../../../helpers/handle-errors";
import hashPassword from "../../../helpers/password-encryption/hash-password";

const changePassword = async Schema => {
  Schema.methods.changePassword = async function(oldPassword, newPassword) {
    const isPassword = await bcrypt.compare(oldPassword, this.password);
    if (!isPassword) {
      return handleError("old password doesnt match", 406);
    } else {
      this.password = await hashPassword(newPassword);
      return this.save()
        .then(() => {
          return true;
        })
        .catch(error => {
          logger.error(error);
          handleError(error, 500);
        });
    }
  };
};

export { changePassword as default };
