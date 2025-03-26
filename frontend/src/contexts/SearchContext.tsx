import React, { useContext, useState } from "react";

type SearchContext = {
    destination: string,
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
    saveSearchvalues: (destination:string, checkIn:Date, checkOut:Date, adultCount: number, childCount:number) => void;
}

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
    children: React.ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) =>{

    const[destination, setDestination] = useState<string>(()=> sessionStorage.getItem("destination") || "");
    const[checkIn, setcheckIn] = useState<Date>(() => new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
    const[checkOut, setcheckOut] = useState<Date>(() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
    const[adultCount, setAdultCount] = useState<number>(()=> parseInt(sessionStorage.getItem("adultCount") || "1"));
    const[childCount, setChildCount] = useState<number>(()=> parseInt(sessionStorage.getItem("childCount") || "0"));
    const[hotelId, setHotelId] = useState<string>(() => sessionStorage.getItem("hotelId") || "");

    const saveSearchvalues = (destination:string, checkIn:Date, checkOut:Date, adultCount: number, childCount:number, hotelId?: string) =>{
        setDestination(destination);
        setcheckIn(checkIn);
        setcheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        
        if(hotelId){
            setHotelId(hotelId);
        }

        sessionStorage.setItem("desination", destination);
        sessionStorage.setItem("checkIn", checkIn.toISOString());
        sessionStorage.setItem("checkOut", checkOut.toISOString());
        sessionStorage.setItem("adultCount", adultCount.toString());
        sessionStorage.setItem("childCount", childCount.toString());

        if(hotelId){
          sessionStorage.setItem("hotelId", hotelId);
        }
    }

    return (
        <SearchContext.Provider value={{
            destination,
            checkIn,
            checkOut,
            childCount,
            adultCount,
            hotelId,
            saveSearchvalues,
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = ()=>{
    const context = useContext(SearchContext);
    return context as SearchContext;
}