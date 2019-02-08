import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import { mustBelongTo, belongsTo } from "../../helpers/model-relationship";

const groupMessageSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["saved", "delivered", "read"],
      default: "saved"
    },
    message: {
      messageType: {
        type: String,
        enum: ["text", "file"],
        required: true
      },
      data: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
);

groupMessageSchema.plugin(mustBelongTo, {
  ref: "Organization",
  type: mongoose.Schema.Types.ObjectId,
  name: "organization"
});
groupMessageSchema.plugin(mustBelongTo, {
  ref: "Group",
  type: mongoose.Schema.Types.ObjectId,
  name: "group"
});

groupMessageSchema.plugin(mustBelongTo, {
  ref: "User",
  type: mongoose.Schema.Types.ObjectId,
  name: "sender"
});

groupMessageSchema.plugin(belongsTo, {
  ref: "GroupMessage",
  type: mongoose.Schema.Types.ObjectId,
  name: "repliedMessage"
});

groupMessageSchema.plugin(mongoosePaginate);
const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);

export { GroupMessage as default };
