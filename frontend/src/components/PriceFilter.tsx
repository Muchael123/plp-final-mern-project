type Props = {
    selectedprice?: number;
    onChange: (value: number) => void;
}


const PriceFilter = ({selectedprice, onChange}: Props) =>{
    return (
        <div>
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select className="p-2 border rounded-md w-full"
             value={selectedprice} onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : 0)}>
                <option value="">Select Max Price</option>
                {[50, 100, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400].map((price)=>(
                    <option value={price} key={price}>{price}</option>
                ))}
            </select>
        </div>
    )
}

export default PriceFilter;