import generateCode from "../../../helpers/generate-code";
import logger from "../../../utils/logger";
import sendMail from "../../../helpers/mailer";

const createVerificationCode = async Schema => {
  Schema.methods.createVerificationCode = function() {
    this.verificationCode = generateCode();
    return this.save()
      .then(() => {
        const to = [this.email];
        const subject = "WorkChat Verification Code";
        const text = `your verification code number is ${this.codeNumber}
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

export { createVerificationCode as default };
