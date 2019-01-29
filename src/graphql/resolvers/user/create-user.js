import User from "../../../models/user";
import Organization from "../../../models/organization";
import Group from "../../../models/group";
import handleError from "../../../helpers/handle-errors";
import sanitizeString from "../../../helpers/data-sanitizers/sanitize-string";
import validate from "../../../helpers/validators/user/create";
import generateCode from "../../../helpers/generate-code";
import hashPassword from "../../../helpers/password-encryption/hash-password";
import sendMail from "../../../helpers/mailer";

const createUserAccount = async ({ data }, req) => {
  const { error } = validate(data);
  if (error) {
    return handleError(error.details[0].message, 400);
  }
  sanitizeString(data);
  const emailExist = await User.findOne({ email: data.email });
  if (emailExist) {
    return handleError("user email already exist", 400);
  }
  const organization = await Organization.findOne({ _id: data.organization });
  if (!organization) {
    return handleError("organization not found", 404);
  } else {
    const wasInvited = organization.invitedEmails.find(
      invitedEmail => invitedEmail === data.email
    );
    if (!wasInvited) {
      return handleError(
        "you dont have access to create an account under this organization"
      );
    }

    let verificationCode = generateCode();
    let password = await hashPassword(data.password);
    const { name, email } = data;
    const userData = {
      name,
      email,
      password,
      organization: data.organization,
      verificationCode
    };
    if (data.phone) {
      userData.phone = data.phone;
    }

    const user = new User(userData);
    return user
      .save()
      .then(() => {
        return Organization.updateOne(
          { _id: data.organization },
          {
            $addToSet: { members: user._id },
            $pull: { invitedEmails: data.email }
          }
        );
      })
      .then(() => {
        return Group.updateOne(
          { isDefault: true },
          { $addToSet: { participants: user._id } }
        );
      })
      .then(() => {
        // generate token to send to the client
        const userAuth = user.generateAuthToken();
        // prepare the mail message
        const to = [user.email];
        const subject = "Welcome to WorkChat";
        const text = `Welcome to workchat, the best platform where you can easily communicate with your colleague and staffs \n
        but to enjoy the full features of our platform you have to verify your account with this code number ${verificationCode}. \n \n \n
        Thanks and welcome to the workchat family
        `;
        sendMail(to, subject, text);
        return userAuth;
      })
      .catch(err => {
        handleError(err.message, 500);
      });
  }
};

export { createUserAccount as default };
