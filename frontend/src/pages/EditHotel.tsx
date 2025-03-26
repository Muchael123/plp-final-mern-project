import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api-client';
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";


const EditHotel = () =>{

    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    // here fetchMyHotelById requires an argument thats why we pass it inside a function. if no paramter we use  queryFn:apiClient.fetchMyHotelById

    const{data: hotel } = useQuery({queryKey:["fetchMyHotelById"], queryFn: () => apiClient.fetchMyHotelById(hotelId || ''), retry: false, enabled: !!hotelId})

    const {mutate, isPending} = useMutation({
        mutationFn: apiClient.updateMyHotelById,
        onSuccess: () =>{ 
            showToast({message: "Hotel Saved!", type:"SUCCESS"});
        },
        onError:  ()=>{
            showToast({message: "Error Saving Hotel", type:"ERROR"});
        }
    });

    const handleSave = (hotelFormData: FormData) =>{
        mutate(hotelFormData);
    }

    return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isPending}/>
}

export default EditHotel;