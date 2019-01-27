import bcrypt from "bcryptjs";

const hashPassword = async password => {
  const hash = await bcrypt.hash(password, 8);
  return hash;
};

export { hashPassword as default };
