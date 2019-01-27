import getUsers from "./user/get-users";
import createOrganizationAccount from "./organization/create-organization";
import verifyAccount from "./user/verify-account";
import resendCode from "./user/resend-code";
import resetPassword from "./user/reset-password";
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
  }
};

export { resolvers as default };
