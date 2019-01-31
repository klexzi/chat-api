import GroupMessage from "../../group-message";
import handleError from "../../../helpers/handle-errors";
import Group from "../../group";
import isParticipant from "../../../helpers/is-participant";

const sendGroupMessage = Schema => {
  Schema.methods.sendGroupMessage = async function({
    message,
    group: groupId,
    repliedMessage
  }) {
    const recipientGroup = await Group.findOne({ _id: groupId });
    if (!recipientGroup) {
      return handleError("group not found", 404);
    }

    const isAParticipant = isParticipant([this._id.toString()], recipientGroup);
    if (!isAParticipant) {
      return handleError(
        "you are not a member of the group and therefore cannot send message to this group"
      );
    }

    let messageData = {
      message: {
        messageType: message.messageType,
        data: message.data
      },
      organization: String(this.organization),
      group: String(groupId),
      sender: String(this._id)
    };

    if (repliedMessage) {
      const taggedMessage = await GroupMessage.findOne({
        _id: repliedMessage
      });
      if (!taggedMessage) {
        return handleError("message to be replied not found", 404);
      }
      messageData.repliedMessage = String(taggedMessage._id);
    }
    const sendMessage = new GroupMessage(messageData);
    return sendMessage
      .save()
      .then(messageDoc => {
        return messageDoc;
      })
      .catch(error => {
        return handleError(error.message, 500);
      });
  };
};

export { sendGroupMessage as default };
