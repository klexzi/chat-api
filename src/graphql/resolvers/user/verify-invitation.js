import User from "../../../models/user";
import Organization from "../../../models/organization";
import handleError from "../../../helpers/handle-errors";
import sanitizeString from "../../../helpers/data-sanitizers/sanitize-string";

const verifyInvitation = async (args, req) => {
  sanitizeString(args);
  const { email, organization: organizationId } = args;
  const organizationExist = await Organization.findOne({ _id: organizationId });
  if (!organizationExist) {
    return handleError("organization not found", 404);
  }
  const isUser = await User.findOne({ email, organization: organizationId });
  if (isUser) {
    if (isUser.isVerified) {
      return { newUser: false, isVerified: true };
    }
    return { newUser: false, isVerified: false };
  } else {
    const wasInvited = organizationExist.invitedEmails.find(
      invitedEmail => invitedEmail === email
    );
    if (!wasInvited) {
      return handleError(
        "you were not invited to join this organization, if you are a member of this organization, please contact your administrator to invite you",
        406
      );
    } else {
      return { newUser: true, isVerified: false };
    }
  }
};

export { verifyInvitation as default };
