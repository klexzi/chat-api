import Organization from "../../organization";
import Group from "../../group";
import isMember from "../../../helpers/is-member";
import isParticipant from "../../../helpers/is-participant";
import handleError from "../../../helpers/handle-errors";
const removeFromGroup = async Schema => {
  Schema.methods.removeFromGroup = async function({
    participants,
    organization: organizationId,
    group: groupId
  }) {
    const organization = await Organization.findOne({ _id: organizationId });
    if (!organization) {
      return handleError("organization not found", 404);
    }
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return handleError("group not found", 404);
    }

    const areParticipants = isParticipant(participants, group);
    if (!areParticipants) {
      return handleError(
        "you can only remove participant who are participants in the group",
        406
      );
    }
    return Group.updateOne({ _id: groupId }, { $pullAll: { participants } })
      .then(() => true)
      .catch(error => handleError(error.message, 500));
  };
};

export { removeFromGroup as default };
