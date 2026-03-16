import deviceModel from "../models/DeviceModel.js";
import { startOrResetTimer, pauseTimer } from "../utils/timerManager.js";

//registering a device
export const registerDevice = async (req, res) => {
    try {
        const { deviceId, timeout, alert_email } = req.body;
        if (!deviceId || !timeout || !alert_email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingDevice = await deviceModel.findOne({ deviceId });
        if (existingDevice) {
            return res.status(400).json({ message: "Device already exists" });
        }

        const newDevice = new deviceModel({ deviceId, timeout, alert_email });
        await newDevice.save();
        res.status(201).json({ message: "Device registered successfully", device: newDevice });
    }
    catch (error) {
        console.error("Error registering device:", error);
        res.status(500).json({ message: "Server error" });
    }
};



//receive signal from device and reset timer
export const handleHeartbeat = async (req, res) => {
    try {
        const { id } = req.params;

        const device = await deviceModel.findOne({ deviceId: id });

        // check if monitor exists
        if (!device) {
            return res.status(404).json({
                message: "Device not found"
            });
        }

        // update heartbeat timestamp
        device.lastHeartbeat = new Date();

        // if device was paused, resume it
        if (device.status === "paused") {
            device.status = "active";
        }

        // reset the timer
        startOrResetTimer(device.deviceId, device.timeout);

        return res.status(200).json({
            message: "Heartbeat received. Timer reset.",
            device: id
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }

}


//pausing timer for a device
export const pauseDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const device = await deviceModel.findOne({ deviceId: id });

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        pauseTimer(device.deviceId);
        device.status = "paused";
        await device.save();
        return res.status(200).json({ message: "Device paused successfully" });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};