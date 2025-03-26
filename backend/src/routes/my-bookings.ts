import express, {Request, Response} from 'express';
import verifyToken from '../middleware/auth.js';
import Hotel from '../models/hotel.js';
import { HotelType } from '../shared/types.js';

const router = express.Router();

// api/my-bookings
router.get('/', verifyToken, async (req: Request, res: Response)=>{
    try {
         const hotels = await Hotel.find({
            bookings: {
                $elemMatch: {
                    userId: req.userId
                }
            }
         })
         
         const results = hotels.map((hotel)=>{
                const userBooking = hotel.bookings.filter((booking) => booking.userId === req.userId);
                const hotelWithUserBookings: HotelType = {
                    ...hotel.toObject(),
                    bookings: userBooking
                }
                return hotelWithUserBookings;
         })

         res.status(200).send(results);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "unable to fetch bookings"});
    }
})











export default router;