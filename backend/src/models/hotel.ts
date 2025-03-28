import mongoose from 'mongoose';
import { BookingType, HotelType } from '../shared/types.js';

const BookingSchema = new mongoose.Schema<BookingType>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    adultCount: {type: Number, required: true},
    childCount: {type: Number, required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    userId: {type: String, required: true},
    totalCost: {type: Number, required: true}
})


const hotelSchema = new mongoose.Schema<HotelType>({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    adultCount: {type: Number, required: true},
    childCount: {type: Number, required: true},
    facilities: [{type:String, required: true}],
    pricePerNight: {type: Number, required: true},
    starRating: {type: Number, required: true, min:1, max: 5},
    imageUrls: [{type:String, required: true}],
    lastUpdated: {type: Date, required: true},
    bookings: [BookingSchema]
})


const Hotel = mongoose.model<HotelType>("hotel", hotelSchema);

export default Hotel;

