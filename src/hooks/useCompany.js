import { useState } from "react";
import companyApi from "../api/companyApi";

const useCompany = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createCompanyVehicle = async (data) => {
        setLoading(true);
        setError(null);
        try{
            const response = await companyApi.postCompanyVehicle(data);
            if(response){
                setLoading(false);
                return response.result;
            }else{
                setLoading(false);
                return null;
            }
        }catch(error){
            setError(error?.message || "Đã xảy ra lỗi khi tạo xe cho công ty.");
            setLoading(false);
        }
    }

    const createDriver = async (data) => {
        setLoading(true);
        setError(null);
        try{
            const response = await companyApi.postCompanyDriver(data);
            if(response){
                setLoading(false);
                return response.result;
            }else{
                setLoading(false);
                return null;
            }
        }catch(error){
            setError(error?.message || "Đã xảy ra lỗi khi tạo tài xế cho công ty.");
            setLoading(false);
        }
    }


    const getCompanyVehicle = async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await companyApi.getCompanyVehicle();
            if(response){
                setLoading(false);
                return response.result;
            }else{
                setLoading(false);
                return null;
            }
        }catch(error){
            setError(error?.message || "Đã xảy ra lỗi khi tải danh sách xe của công ty.");
            setLoading(false);
        }
    }

    const getCompanyVehicleById = async (id) => {
        setLoading(true);
        setError(null);
        try{
            const response = await companyApi.getCompanyVehicleById(id);
            if(response){
                setLoading(false);
                return response.result;
            }else{
                setLoading(false);
                return null;
            }
        }catch(error){
            setError(error?.message || "Đã xảy ra lỗi khi tải thông tin xe của công ty.");
            setLoading(false);
        }
    }

    const getCompanyInvoice = async (id) => {
        setLoading(true);
        setError(null);
        try{
            const response = await companyApi.getCompanyInvoice(id);
            if(response){
                setLoading(false);
                return response.result
            }else{
                setLoading(false);
                return null;
            }

    }catch(error){
        setError(error?.message || "Đã xảy ra lỗi khi tải thông tin hóa đơn của công ty.")
        setLoading(false);
    }
};


    const getDriverById = async (id) => {
        setLoading(true);
        setError(null);
        try{
            const response = await companyApi.getDriverById(id);
            console.log("driver:", response);
            if(response){
                setLoading(false);
                return response.result;
            }else{
                setLoading(false);
                return null;
            }
        }catch(error){
            setError(error?.message || "Đã xảy ra lỗi khi tải thông tin tài xế của công ty.");
            setLoading(false);
        }
    };

    const getUserCompany = async () => {
        setLoading(true);
        setError(null);

        try{
            const response = await companyApi.getUserCompany();
            if(response){
                setLoading(false);
                return response.result;
            }else{
                setLoading(false);
                return null;
            }
        }catch(error){
            setError(error?.message || "Đã xảy ra lỗi khi tải danh sách công ty.");
            setLoading(false);
        }
    }

    
    
    return {
        loading,
        error,
        getUserCompany,
        getCompanyVehicle,
        getCompanyVehicleById,
        createCompanyVehicle,
        createDriver,
        getDriverById,
        getCompanyInvoice
    };
}
export default useCompany;