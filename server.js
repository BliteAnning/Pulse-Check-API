import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import deviceRouter from './routes/DeviceRouter.js';






const app = express();
app.use(cors({
    origin: "*",
    
}));
app.use(express.json());


//routes
app.use('/api',deviceRouter)



const PORT = process.env.PORT ;
connectDB().then (()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port`);
    console.log("DB connected");
    
});
})
