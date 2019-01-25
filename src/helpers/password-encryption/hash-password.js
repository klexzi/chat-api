import bcrypt from "bcryptjs";
import handleError from "../handle-errors";

const hashPassword = async password => {
  const hash = await bcrypt.hash(password, 8);
  return hash;
};

export { hashPassword as default };
