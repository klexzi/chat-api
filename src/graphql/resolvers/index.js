import getUsers from "./get-users";
import createOrganizationAccount from "./create-organization"
const resolvers = {
  async users() {
    return await getUsers()
  },
  async createOrganizationAccount(args) {
    return await createOrganizationAccount(args);
  }
};

export { resolvers as default };
