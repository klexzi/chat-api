import * as dotenv from "dotenv";

const isProduction = process.env.NODE_ENV === "production";
if (!isProduction) {
  dotenv.config();
}

export const PORT = process.env.PORT || 3000;
export const WORKCHAT_JWT_KEY = process.env["WORKCHAT_JWT_KEY"];
export const MONGODB_URI = isProduction
  ? process.env["MONGODB_URI"]
  : process.env["MONGODB_URI_LOCAL"];
export const SENDGRID_KEY = process.env["SENDGRID_KEY"];
