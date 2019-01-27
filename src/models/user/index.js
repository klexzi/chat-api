import mongoose from "mongoose";
import { mustBelongTo } from "../../helpers/model-relationship";
import generateAuthToken from "./methods/genertate-token";
import verifyAccount from "./methods/verify-account";
import createVerificationCode from "./methods/create-verification-code";
import createResetCode from "./methods/create-reset-code";
import resetPassword from "./methods/reset-password";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    role: String,
    imageUrl: String,
    verificationCode: Number,
    resetCode: Number,
    lastLogin: Date,
    lastSeen: Date,
    online: {
      type: Boolean,
      default: false
    },
    phone: String
  },
  { timestamps: true }
);

userSchema.plugin(mustBelongTo, {
  ref: "Organization",
  type: mongoose.Schema.Types.ObjectId,
  name: "organization"
});

generateAuthToken(userSchema);
verifyAccount(userSchema);
createVerificationCode(userSchema);
createResetCode(userSchema);
resetPassword(userSchema);

const User = mongoose.model("User", userSchema);

export { User as default };
