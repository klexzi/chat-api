import User from "../";
import PrivateMessage from "../../private-message";
import handleError from "../../../helpers/handle-errors";

const sendPrivateMessage = Schema => {
  Schema.methods.sendPrivateMessage = async function({
    message,
    recipient,
    repliedMessage
  }) {
    if (String(this._id) === String(recipient)) {
      return handleError("you cannot send message to yourself", 406);
    }
    const recipientUser = await User.findOne({ _id: recipient });
    if (!recipientUser) {
      return handleError("recipient not found with the id passed", 404);
    }
    if (
      this.organization.toString() !== recipientUser.organization.toString()
    ) {
      return handleError(
        "cannot send message to user that is not in the same organization channel",
        406
      );
    }

    let messageData = {
      message: {
        messageType: message.messageType,
        data: message.data
      },
      organization: String(this.organization),
      recipient,
      sender: String(this._id)
    };

    if (repliedMessage) {
      const taggedMessage = await PrivateMessage.findOne({
        _id: repliedMessage
      });
      if (!taggedMessage) {
        return handleError("message to be replied not found", 404);
      }
      messageData.repliedMessage = String(taggedMessage._id);
    }

    const sendMessage = new PrivateMessage(messageData);
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

export { sendPrivateMessage as default };
