import User from "../";
const contacts = Schema => {
  Schema.methods.contacts = async function() {
    const users = await User.find({
      organization: this.organization,
      _id: { $ne: this._id }
    });
    return users;
  };
};

export { contacts as default };
