import Organization from "../../organization";
import Group from "../../group";
import isMember from "../../../helpers/is-member";
import isParticipant from "../../../helpers/is-participant";
import handleError from "../../../helpers/handle-errors";
const inviteToGroup = async Schema => {
  Schema.methods.inviteToGroup = async function({
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
    const areMembers = isMember(participants, organization);
    if (!areMembers) {
      return handleError(
        "you can only add participant who are members of the organization",
        406
      );
    }

    const areParticipants = isParticipant(participants, group);
    if (areParticipants) {
      return handleError(
        "you can only add participant who are not participants in the group",
        406
      );
    }
    return Group.updateOne(
      { _id: groupId },
      { $addToSet: { participants: { $each: participants } } }
    )
      .then(() => true)
      .catch(error => handleError(error.message, 500));
  };
};

export { inviteToGroup as default };
