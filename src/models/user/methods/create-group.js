import Organization from "../../organization";
import handleError from "../../../helpers/handle-errors";
import logger from "../../../utils/logger";
import Group from "../../group";
import isMember from "../../../helpers/is-member";

const createGroup = async Schema => {
  Schema.methods.createGroup = async function(data) {
    const organization = await Organization.findOne({ _id: this.organization });
    if (!organization) {
      return handleError("organization not found", 404);
    }

    const nameExist = await Group.findOne({ name: data.name });
    if (nameExist) {
      return handleError("group with that name already exist", 406);
    }
    if (data.participants.length > 0) {
      const areMembers = isMember(data.participants, organization);
      if (!areMembers) {
        return handleError(
          `you cannot someone who is not a member of the organization`
        );
      }
    }
    let participants = data.participants.concat([String(this._id)]);
    participants = new Set(participants);
    participants = Array.from(participants);
    let groupData = {
      name: data.name,
      organization: this.organization,
      participants
    };

    const group = new Group(groupData);
    return group
      .save()
      .then(groupDoc => {
        logger.debug(groupDoc);
        return groupDoc;
      })
      .catch(error => {
        return handleError(error.message, 500);
      });
  };
};

export { createGroup as default };
