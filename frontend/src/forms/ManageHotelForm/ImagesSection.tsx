import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () =>{
    const {register, formState: {errors}, watch, setValue} = useFormContext<HotelFormData>();

    const exsistingImageUrls = watch('imageUrls');

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, imageUrl: string) =>{
        event.preventDefault();
        
        setValue("imageUrls", exsistingImageUrls.filter((url)=>{
            return url !== imageUrl
        }));
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {
                    exsistingImageUrls && (
                        <div className="grid grid-cols-6 gap-4">
                            {
                                exsistingImageUrls.map((url)=>(
                                    <div key={url} className="relative group">
                                        <img src={url} className="min-h-full object-cover"/>
                                        <button 
                                            onClick={(event)=> handleDelete(event, url)}
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 text-white">Delete</button>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal" {...register("imageFiles", {
                    validate: (imageFiles) =>{
                        const totalLength = imageFiles.length + (exsistingImageUrls?.length || 0);
                        if(totalLength === 0){
                           return "A least one image must be added";
                        }
                        if(totalLength>6){
                            return "Total number of images cannot be more than 6";
                        }
                        return true;
                    }
                })}/>
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
            )}  
        </div>
    )
}

export default ImagesSection;