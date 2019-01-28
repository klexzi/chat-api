import logger from "../../../utils/logger";
import Organization from "../../organization";
import User from "../index";
import sendMail from "../../../helpers/mailer";
import handleError from "../../../helpers/handle-errors";

const invite = async Schema => {
  Schema.methods.invite = async function(emailAddress) {
    let email = emailAddress.trim().toLowerCase();
    const organization = await Organization.findOne({ _id: this.organization });
    if (!organization) {
      return handleError("no organization found for this user", 500);
    } else {
      const emailInvited = organization.invitedEmails.find(
        invitedEmail => invitedEmail === email
      );
      if (emailInvited) {
        return handleError("email as already been invited", 400);
      }
      const userWithEmail = await User.findOne({
        email,
        organization: organization._id
      });
      if (userWithEmail) {
        return handleError(
          "user with this email as already joined the organization",
          400
        );
      } else {
        return Organization.findOneAndUpdate(
          { _id: String(organization._id) },
          { $push: { invitedEmails: email } }
        )
          .then(() => {
            sendMail(
              email,
              "Invitation To Join Your Organization WorkChat",
              "You have been invited to join your organization work chat, click this link to do so now"
            );
            return true;
          })
          .catch(error => {
            return handleError(error.message, 500);
          });
      }
    }
  };
};

export { invite as default };
