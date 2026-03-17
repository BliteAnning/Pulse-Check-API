import deviceModel from "../models/DeviceModel.js";


const timers = {};
const intervals = {};

export const startOrResetTimer = async (deviceId, timeout)=> {
    // clear existing timer if it exists
    if (timers[deviceId]) {
        clearTimeout(timers[deviceId]);
    }

    if (intervals[deviceId]) {
        clearInterval(intervals[deviceId]);
    }

    let remaining = timeout;

    //tracking timer on console.
    intervals[deviceId] = setInterval(() => {
        remaining--;
        console.log(`Device ${deviceId} expires in ${remaining}s`);
        if (remaining <= 0) {
            clearInterval(intervals[deviceId]);
            delete intervals[deviceId];
        }
    }, 1000);

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





export const pauseTimer = async (deviceId)=> {
    if (timers[deviceId]) {
        clearTimeout(timers[deviceId]);
        delete timers[deviceId];
    }
     if (intervals[deviceId]) {
        clearInterval(intervals[deviceId]);
        delete intervals[deviceId];
    }
}


