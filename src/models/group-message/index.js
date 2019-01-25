import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema({
   status: {
      type: String,
      enum: ["saved", "delivered", "read"],
      default : "saved"
   }
}, {timestamps: true});

groupMessageSchema.plugin(mustBelongTo, {
   ref: "Organization",
   type: mongoose.Schema.Types.ObjectId,
   name: "organization"
})

groupMessageSchema.plugin(mustBelongTo, {
   ref: "User",
   type: mongoose.Schema.Types.ObjectId,
   name: "recipient"
});

privateMessageSchema.plugin(belongsTo, {
   ref: "PrivateMessage",
   type: mongoose.Schema.Types.ObjectId,
   name: "replyingMessage"
});


const GroupMessage= mongoose.model("GroupMessage", groupMessageSchema);

export {GroupMessage as default}

