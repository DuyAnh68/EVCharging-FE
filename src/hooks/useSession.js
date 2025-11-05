import { useState } from "react";
import sessionApi from "../api/sessionApi";

const useSession = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getVehicleSession = async(vehicleId) => {
        setLoading(true);
        setError(null);
        try{
            const response = await sessionApi.getSessionsByVehicleId(vehicleId);
            console.log("object", vehicleId);
            console.log("responseSession", response);
            if(response){
                setLoading(false);
                return response;              
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