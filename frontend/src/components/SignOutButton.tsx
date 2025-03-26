import { useMutation} from "@tanstack/react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () =>{

    const {showToast, refetch} = useAppContext();
 
    const mutation = useMutation({
        mutationFn: apiClient.signOut,
        onSuccess: () =>{
            showToast({message: "Signed Out!", type: "SUCCESS"})
            refetch();
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"})
        }
    })

    const handleclick = () =>{
        mutation.mutate()
    }

    return (
        <button onClick={handleclick} className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100">Sign Out</button>
    )
}


export default SignOutButton;