import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    deviceId:{type: String, required: true},
    timeout:{type: Number, required: true},
    alert_email:{type: String, required: true},
    status:{type: String, required: true, default: "active"},
    lastHeartbeat:{type: Date}
}, { timestamps: true });
const deviceModel = mongoose.model("device", deviceSchema);

export default deviceModel;