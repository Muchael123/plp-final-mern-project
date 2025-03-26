import { hotelFacilities } from "../config/hotels-options-config";


type Props = {
    selectedFacilitiesTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilitiesTypes, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Facilities</h4>
            {hotelFacilities.map((faciltiy) => (
                <label key={faciltiy} className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        className="rounded" 
                        value={faciltiy} 
                        checked={selectedFacilitiesTypes.includes(faciltiy)}
                        onChange={onChange} 
                    />
                    <span>{faciltiy}</span>
                </label>
            ))}
        </div>
    );
};

export default FacilitiesFilter;