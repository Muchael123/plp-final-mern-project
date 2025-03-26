import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import hotelsRouter from './routes/my-hotels.js'
import searchHotelRouter from './routes/hotels.js'
import bookingsRouter from './routes/my-bookings.js'
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("Connected!");
})

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//cors server middleware //because of diffrent port on server or intirely differnt server
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/my-hotels', hotelsRouter);

app.use('/api/hotels', searchHotelRouter);
app.use('/api/my-bookings', bookingsRouter);


// For any unknown routes and condinital routes like add-hotel as it is a protected route and is handled by router-dom
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
})

app.listen(7000, ()=>{
    console.log("Server running on port 7000");
})