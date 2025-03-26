import { useQuery } from '@tanstack/react-query';
import * as apiClient from '../api-client';
import BookingForm from '../forms/BookingForm/BookingForm';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookingDeatilsSummary from '../components/BookingDeatilsSummary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';



const Booking = () =>{

    const { stripePromise } = useAppContext();

    const search = useSearchContext();

    const { hotelId } = useParams();

    const [numberOfNights, setNumberOfNights] = useState<number>(0);

    useEffect(()=>{

        if(search.checkIn && search.checkOut){
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
            setNumberOfNights(Math.ceil(nights));
        }

    }, [search.checkIn, search.checkOut]);

    const { data: payementIntentData } = useQuery({
        queryKey: ["createPaymnetIntent"],
        queryFn: () => apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()),
        enabled: !!hotelId && numberOfNights>0
    })

    const { data: hotel } = useQuery({
        queryKey: ["fetchHotelById"],
        queryFn: () => apiClient.fetchHotelById(hotelId as string),
        enabled: !!hotelId
    })

    const {data: currentUser} = useQuery({
        queryKey: ["fetchCurrentUser"],
        queryFn: apiClient.fetchCurrentUser,
    })

    if(!hotel){
        return (
            <></>
        )
    }

    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
            <BookingDeatilsSummary checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} numberOfNights={numberOfNights} hotel={hotel}/>
            {currentUser && payementIntentData && (
                <Elements stripe={stripePromise} options={{
                    clientSecret: payementIntentData.clientSecret,
                }}>
                    <BookingForm currentUser={currentUser} paymentIntent={payementIntentData}/>
                </Elements>
                )}
        </div>
    )
}


export default Booking;