import sendgrid from "@sendgrid/mail";
import { SENDGRID_KEY } from "../utils/secrets";
import logger from "../utils/logger";
import handleErrors from "../helpers/handle-errors";

const sendMail = async (to, subject, text, html = null) => {
  sendgrid.setApiKey(SENDGRID_KEY);
  const sender = "workchat@workchat.com";
  const mail = {
    to,
    from: sender,
    subject,
    text
  };

  return sendgrid
    .send(mail, true)
    .then(result => {})
    .catch(error => {
      logger.error(error);
      handleErrors(error, 500);
    });
};

export { sendMail as default };
