import { useState } from "react";
import sessionApi from "../api/sessionApi";

const useSession = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getVehicleSession = async (vehicleId) => {
        setLoading(true);
        try{
            const response = await sessionApi.getSessionsByVehicleId(vehicleId);
            if(response){
                setLoading(false);
                return response.result;              
            }
                
        }catch(e){
            setError(e.message);
            return e.message;
        }finally{
            setLoading(false);
        }
    }
    return{
        getVehicleSession,
        loading,
        error
    };
};

export default useSession;