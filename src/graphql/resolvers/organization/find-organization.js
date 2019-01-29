import handleError from "../../../helpers/handle-errors";
import sanitizeString from "../../../helpers/data-sanitizers/sanitize-string";
import Organization from "../../../models/organization";

const findOrganization = async (args, req) => {
  sanitizeString(args.where);
  const organization = await Organization.findOne({ email: args.where.email });
  if (!organization) {
    return handleError("organization not found", 404);
  } else {
    return String(organization._id);
  }
};

export { findOrganization as default };
