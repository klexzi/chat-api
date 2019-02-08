import PrivateMessage from "../../private-message";

const privateMessages = Schema => {
  Schema.methods.privateMessages = async function({ recipient }, options) {
    const query = {
      $or: [
        { $and: [{ sender: this._id }, { recipient }] },
        { $and: [{ sender: recipient }, { recipient: this._id }] }
      ],
      organization: this.organization
    };
    const messages = await PrivateMessage.paginate(query, options);
    return messages;
  };
};

export { privateMessages as default };
