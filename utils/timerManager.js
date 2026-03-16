import deviceModel from "../models/DeviceModel.js";


const timers = {};

function startOrResetTimer(deviceId, timeout) {
    // clear existing timer if it exists
    if (timers[deviceId]) {
        clearTimeout(timers[deviceId]);
    }

    timers[deviceId] = setTimeout(async () => {
        try {

            // update device status in MongoDB
            await deviceModel.findOneAndUpdate(
                { deviceId },
                { status: "down" }
            );

            console.log({
                ALERT: `Device ${deviceId} is down!`,
                time: new Date().toISOString()
            });

            delete timers[deviceId];

        } catch (error) {
            console.error("Timer error:", error);
        }

    }, timeout * 1000);
}





function pauseTimer(deviceId) {
    if (timers[deviceId]) {
        clearTimeout(timers[deviceId]);
        delete timers[deviceId];
    }
}

export default {
    startOrResetTimer,
    pauseTimer
};