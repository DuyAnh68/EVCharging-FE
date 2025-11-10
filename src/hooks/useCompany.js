import { useState } from "react";
import companyApi from "../api/companyApi";

const useCompany = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserCompany = async () => {
        setLoading(true);
        setError(null);

        try{
            const response = await companyApi.getUserCompany();
            if(response){
                setLoading(false);
                return response.result;
            }
        }catch(error){
            setError(error);
            setLoading(false);
        }
    }
    
    return {
        loading,
        error,
        getUserCompany
    };
}
export default useCompany;