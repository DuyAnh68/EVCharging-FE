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

    const deleteDriver = async (id) => {
        setLoading(true);
        setError(null);
        try{
            const response = await companyApi.deleteDriver(id);
            if(response .result === "User has been deleted successfully"){
                setLoading(false);
                return "Đã xóa tài xế thành công.";
            }else{
                setLoading(false);
                return "Xóa tài xế thất bại. Vui lòng thử lại.";
            }
        }catch(error){
            setError(error?.message || "Đã xảy ra lỗi khi xóa tài xế của công ty.");
            setLoading(false);
        }
    };

    const updateCompany = async (id, data) => {
        setLoading(true);
        setError(null);
        try{
            const response = await companyApi.updateCompany(id, data);
            if (response.code === 1000){
                setLoading(false);
                return "Cập nhật thông tin doanh nghiệp thành công.";
            }
        }catch(error){
            setError(error?.message || "Đã xảy ra lỗi khi cập nhật thông tin doanh nghiệp.");
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

    const getCompanyInvoiceDetails = async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await companyApi.getCompanyInvoiceDetails();
            if(response){
                setLoading(false);
                return response.result;
            }else{
                setLoading(false);
                return null;
            }
        }catch(error){
            setError(error?.message || "Đã xảy ra lỗi khi tải thông tin chi tiết hóa đơn của công ty.");
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
        getCompanyInvoice,
        deleteDriver,
        updateCompany,
        getCompanyInvoiceDetails
    };
}
export default useCompany;