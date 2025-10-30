import { useState } from "react";
import brandApi from "../api/brandApi";

const useBrand = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getBrands = async () => {
    setLoading(true);
    setError(null);
    try{
      const response = await brandApi.getBrand();
      console.log("response", response.result);
      if(response){
        setLoading(false);
        return response.result;
      }
    }catch(error){
      setError(error.message);
      return error.message;
    } finally {
      setLoading(false);
    }
  }
    return{
        error,
        loading,
        getBrands
    };
        
    
};

export default useBrand;