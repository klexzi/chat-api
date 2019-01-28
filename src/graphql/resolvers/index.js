import getUsers from "./user/get-users";
import createOrganizationAccount from "./organization/create-organization";
import verifyAccount from "./user/verify-account";
import resendCode from "./user/resend-code";
import resetPassword from "./user/reset-password";
import changePassword from "./user/change-password";
import login from "./user/login";
import invite from "./user/invite";

const resolvers = {
  async users() {
    return await getUsers();
  },
  async createOrganizationAccount(args) {
    return await createOrganizationAccount(args);
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
  }
};

export { resolvers as default };
