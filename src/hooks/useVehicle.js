import {  useState } from "react";
import vehicleListApi from "../api/vehicleListApi";

const useVehicle = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [models, setModels] = useState([]);
  const [vehicelById, setVehicleById] = useState(null);

  const addVehicle = async (credentials) => {
    setLoading(true);
    setError(null);
    console.log(credentials);
    try {
      const response = await vehicleListApi.addVehicle(credentials);
      console.log(response);
      if (response) {
        setVehicle(response.result);
        setLoading(false);
        return response.result;
      }
    } catch (error) {
      setError(error.message);
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  const getVehicle = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await vehicleListApi.getVehicleList();
      if (response) {
        setVehicle(response.result);
        setLoading(false);
        return response.result;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };

  const getVehicleByBrand = async (brandName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await vehicleListApi.getVehicleByBrand(brandName);
      if (response) {
        setModels(response.result);
        setLoading(false);
        return response.result;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };

  const getVehicleById = async (id) => {
    setLoading(true);
    setError(null);
    try{
      const response = await vehicleListApi.getVehicleById(id);
      console.log("response:", response.result);
      if(response){
        setVehicleById(response.result);
        setLoading(false);
        return response.result
      }
    }catch(e){
      setError(e.message);
      return e.message
    }finally{
      setLoading(false);
    }
  }

  return {
    vehicle,
    loading,
    error,
    getVehicle,
    getVehicleByBrand,
    addVehicle,
    getVehicleById,
    models,
    vehicelById
  };
};

export default useVehicle;
