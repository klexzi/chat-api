import mongoose from "mongoose";

import Organization from "../../../models/organization";
import User from "../../../models/user";
import Group from "../../../models/group";
import validate from "../../../helpers/validators/organization/create";
import handleError from "../../../helpers/handle-errors";
import sanitizeString from "../../../helpers/data-sanitizers/sanitize-string";
import generateCode from "../../../helpers/generate-code";
import hashPassword from "../../../helpers/password-encryption/hash-password";
import sendMail from "../../../helpers/mailer";

const createOrganizationAccount = async ({ data }, req) => {
  const { error } = validate(data);
  if (error) {
    return handleError(error.details[0].message, 400);
  }
  sanitizeString(data);
  const emailExist = await User.findOne({ email: data.email });
  if (emailExist) {
    return handleError("user email already exist", 400);
  }
  const organizationEmailExist = await Organization.findOne({
    email: data.organizationEmail
  });
  if (organizationEmailExist) {
    return handleError("organization email already exist", 400);
  }
  let verificationCode = generateCode();
  // extract data to User and Organization
  const userId = mongoose.Types.ObjectId();
  const organizationId = mongoose.Types.ObjectId();
  const password = await hashPassword(data.password);
  let userData = {
    _id: userId,
    name: data.name,
    email: data.email,
    password,
    isAdmin: true,
    verificationCode,
    organization: organizationId
  };
  if (data.phone) {
    userData.phone = data.phone;
  }

  let organizationData = {
    _id: organizationId,
    name: data.organizationName,
    email: data.organizationEmail,
    user: userId
  };

  let groupData = {
    name: "members",
    isDefault: true,
    organization: organizationId
  };
  if (data.address) {
    organizationData = data.address;
  }

  const user = new User(userData);
  const organization = new Organization(organizationData);
  const group = new Group(groupData);

  return user
    .save()
    .then(() => {
      return organization.save();
    })
    .then(() => {
      return group.save();
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
};

export { createOrganizationAccount as default };
