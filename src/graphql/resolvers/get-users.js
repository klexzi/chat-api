import User from "../../models/user";
const getUsers = async () => {
   const users = await User.find();
   return users;
}

export {getUsers as default}