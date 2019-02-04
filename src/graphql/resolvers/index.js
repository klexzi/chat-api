import getUsers from "./user/get-users";
import createOrganizationAccount from "./organization/create-organization";
import createUserAccount from "./user/create-user";
import verifyAccount from "./user/verify-account";
import resendCode from "./user/resend-code";
import resetPassword from "./user/reset-password";
import changePassword from "./user/change-password";
import login from "./user/login";
import invite from "./user/invite";
import findOrganization from "./organization/find-organization";
import verifyInvitation from "./user/verify-invitation";
import createGroup from "./group/create-group";
import inviteToGroup from "./group/invite-to-group";
import removeFromGroup from "./group/remove-from-group";
import sendMessage from "./private-message/send-message";
import sendGroupMessage from "./group-message/send-message";
import contacts from "./user/contacts";

const resolvers = {
  async users() {
    return await getUsers();
  },
  async createOrganizationAccount(args) {
    return await createOrganizationAccount(args);
  },
  async createUserAccount(args) {
    return await createUserAccount(args);
  },
  async verifyAccount(args, req) {
    return await verifyAccount(args, req);
  },
  async resendCode(args, req) {
    return await resendCode(args, req);
  },
  async resetPassword(args, req) {
    return await resetPassword(args);
  },
  async login(args, req) {
    return await login(args);
  },
  async changePassword(args, req) {
    return await changePassword(args, req);
  },
  async invite(args, req) {
    return await invite(args, req);
  },
  async findOrganization(args, req) {
    return await findOrganization(args, req);
  },
  async verifyInvitation(args, req) {
    return await verifyInvitation(args, req);
  },
  async createGroup(args, req) {
    return await createGroup(args, req);
  },
  async inviteToGroup(args, req) {
    return await inviteToGroup(args, req);
  },
  async removeFromGroup(args, req) {
    return await removeFromGroup(args, req);
  },
  async sendPrivateMessage(args, req) {
    return await sendMessage(args, req);
  },
  async sendGroupMessage(args, req) {
    return await sendGroupMessage(args, req);
  },
  async contacts(args, req) {
    return await contacts(args, req);
  }
};

export { resolvers as default };
