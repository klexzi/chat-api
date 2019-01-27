import getUsers from "./user/get-users";
import createOrganizationAccount from "./organization/create-organization";
import verifyAccount from "./user/verify-account";
const resolvers = {
  async users() {
    return await getUsers();
  },
  async createOrganizationAccount(args) {
    return await createOrganizationAccount(args);
  },
  async verifyAccount(args, req) {
    return await verifyAccount(args, req);
  }
};

export { resolvers as default };
