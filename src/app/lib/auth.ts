import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
