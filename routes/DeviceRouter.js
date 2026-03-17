import { getDevices, handleHeartbeat, pauseDevice,registerDevice } from "../controllers/monitorController.js"
import express from "express";



const deviceRouter = express.Router();

deviceRouter.post('/monitor', registerDevice)
deviceRouter.post('/monitor/:id/pause', pauseDevice)
deviceRouter.post('/monitor/:id/heartbeat', handleHeartbeat)
deviceRouter.get('/monitor/get-devices', getDevices)

export default deviceRouter;