import mongoose from "mongoose";
import { mustBelongTo, hasMany } from "../../helpers/model-relationship";

const orgnazationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      street: String,
      city: String,
      state: String
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    imageUrl: String,
    bannerUrl: String,
    invitedEmails: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

orgnazationSchema.plugin(mustBelongTo, {
  ref: "User",
  type: mongoose.Schema.Types.ObjectId,
  name: "user"
});

orgnazationSchema.plugin(hasMany, {
  ref: "Group",
  type: mongoose.Schema.Types.ObjectId,
  name: "groups"
});

orgnazationSchema.plugin(hasMany, {
  ref: "User",
  type: mongoose.Schema.Types.ObjectId,
  name: "members"
});

const Organization = mongoose.model("Organization", orgnazationSchema);

export { Organization as default };
