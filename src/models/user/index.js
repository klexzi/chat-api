import mongoose from "mongoose";
import { mustBelongTo } from "../../helpers/model-relationship";
import generateAuthToken from "./methods/genertate-token";
import verifyAccount from "./methods/verify-account";

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
    codeNumber: Number,
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

const User = mongoose.model("User", userSchema);

export { User as default };
