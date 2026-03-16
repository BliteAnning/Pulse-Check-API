import mongoose from "mongoose";


const alertLogSchema = new mongoose.Schema({
    deviceId:{type: mongoose.Schema.Types.ObjectId, ref: 'device', required: true},
    message:{type: String, required: true},
    triggeredAt:{type: Date, required: true, default: Date.now},
    resolved:{type: Boolean, required: true, default: false}
}, { timestamps: true });


const alertLogModel = mongoose.model("alertLog", alertLogSchema);

export default alertLogModel;