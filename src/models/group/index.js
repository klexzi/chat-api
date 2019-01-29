import mongoose from "mongoose";
import { hasMany, mustBelongTo } from "../../helpers/model-relationship";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    avatar: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

groupSchema.plugin(mustBelongTo, {
  ref: "Organization",
  type: mongoose.Schema.Types.ObjectId,
  name: "organization"
});

groupSchema.plugin(hasMany, {
  ref: "User",
  type: mongoose.Schema.Types.ObjectId,
  name: "participants"
});

const Group = mongoose.model("Group", groupSchema);

export { Group as default };
