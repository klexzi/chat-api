import logger from "../../../utils/logger";

const verifyAccount = async Schema => {
  Schema.methods.verifyAccount = function(code) {
    if (this.verificationCode === code) {
      this.isVerified = true;
      this.verificationCode = null;
      return this.save()
        .then(() => {
          return true;
        })
        .catch(error => {
          logger.error(error);
          return false;
        });
    }
    return false;
  };
};

export { verifyAccount as default };
