import mongoose from "mongoose";
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["ignore", "interested", "accepted", "rejected"],
    },
  },
  { timestamps: true }
);
// jb bhi kisi type ka serch ya kuch bhi operation karte hai uss time index ki help se chize fast ho jati hai
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const RequestModel = mongoose.model("Request", connectionRequestSchema);
export default RequestModel;
