import generateCode from "../../../helpers/generate-code";
import logger from "../../../utils/logger";
import sendMail from "../../../helpers/mailer";

const createResetCode = async Schema => {
  Schema.methods.createResetCode = function() {
    this.resetCode = generateCode();
    return this.save()
      .then(() => {
        const to = [this.email];
        const subject = "WorkChat Reset Code";
        const text = `your password reset code is ${this.codeNumber}
          `;
        sendMail(to, subject, text);
        return true;
      })
      .catch(error => {
        logger.error(error);
        return false;
      });
  };
};

export { createResetCode as default };
