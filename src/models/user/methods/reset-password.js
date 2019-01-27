import hashPassword from "../../../helpers/password-encryption/hash-password";
import logger from "../../../utils/logger";
import handleError from "../../../helpers/handle-errors";

const resetPassword = async Schema => {
  Schema.methods.resetPassword = async function(code, password) {
    if (code === this.resetCode) {
      this.password = await hashPassword(password);
      this.resetCode = null;
      return this.save()
        .then(() => {
          return true;
        })
        .catch(error => {
          logger.error(error);
          return handleError(
            "unable to change password due to a server error",
            500
          );
        });
    } else {
      return handleError("reset code invalid", 400);
    }
  };
};

export { resetPassword as default };
