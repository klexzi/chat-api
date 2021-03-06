import mongoose from "mongoose";
import { mustBelongTo, belongsTo } from "../../helpers/model-relationship";

const privateMessageSchema = new mongoose.Schema({
   status: {
      type: String,
      enum: ["saved", "delivered", "read"],
      default : "saved"
   }
}, {timestamps: true});

privateMessageSchema.plugin(mustBelongTo, {
   ref: "Organization",
   type: mongoose.Schema.Types.ObjectId,
   name: "organization"
})

privateMessageSchema.plugin(mustBelongTo, {
   ref: "User",
   type: mongoose.Schema.Types.ObjectId,
   name: "recipient"
});

privateMessageSchema.plugin(mustBelongTo, {
   ref: "User",
   type: mongoose.Schema.Types.ObjectId,
   name: "sender"
});


privateMessageSchema.plugin(belongsTo, {
   ref: "PrivateMessage",
   type: mongoose.Schema.Types.ObjectId,
   name: "replyingMessage"
});

const PrivateMessage = mongoose.model("PrivateMessage", privateMessageSchema);

export {PrivateMessage as default}