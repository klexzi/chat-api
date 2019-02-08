import GroupMessage from "../../group-message";
import Group from "../../group";
import handleError from "../../../helpers/handle-errors";

const groupMessages = Schema => {
  Schema.methods.groupMessages = async function({ group }, options) {
    const isParticipant = await Group.findOne({ participants: this._id });
    if (!isParticipant) {
      return handleError(
        "you dont have access to view messages on this group",
        401
      );
    } else {
      const query = {
        group: group,
        organization: this.organization
      };
      const messages = await GroupMessage.paginate(query, options);
      return messages;
    }
  };
};

export { groupMessages as default };
