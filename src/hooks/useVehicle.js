import { useState } from "react";
import vehicleListApi from "../api/vehicleListApi";

const useVehicle = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getVehicle = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await vehicleListApi.getVehicleList();
      if (response) {
        setVehicle(response.result);
        return response.result;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };

  return {
    vehicle,
    loading,
    error,
    getVehicle,
  };
};

export default useVehicle;
