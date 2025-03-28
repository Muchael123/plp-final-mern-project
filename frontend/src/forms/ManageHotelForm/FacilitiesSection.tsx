import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotels-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () =>{
    const {register, formState:{ errors }} = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-5 gap-3">
                {
                    hotelFacilities.map((facility) => (
                        <label key={facility} className="text-sm flex gap-1 text-gray-700">
                            <input type="checkbox" value={facility} {...register("facilities", {
                                validate: (facilities) =>{
                                    if(facilities && facilities.length > 0){
                                        return true;
                                    }
                                    else{
                                        return "At least one facilities is required";
                                    }
                                }
                            })}/>
                            {facility}
                        </label>
                    ))
                }
                {errors.facilities && (
                    <span className="text-red-50 text-sm fold-bold">{errors.facilities.message}</span>
                )}
            </div>
        </div>
    )

}

export default FacilitiesSection;
