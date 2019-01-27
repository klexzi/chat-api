import logger from "../../../utils/logger";

const verifyAccount = async Schema => {
  Schema.methods.verifyAccount = function(code) {
    if (this.codeNumber === code) {
      this.isVerified = true;
      this.codeNumber = null;
      this.save()
        .then(() => {
          return true;
        })
        .catch(error => {
          logger.error(error);
          return false;
        });
      return true;
    }
    return false;
  };
};

export { verifyAccount as default };
