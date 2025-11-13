import userApi from "../api/userApi";
import { useState } from "react";


const useUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const getUser = async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await userApi.getUser();
            if(response){
                setUser(response.result);
                setLoading(false);
                return response.result;
            }
        }catch (e) {
            setError(e.message);
            return e.message;
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userApi.updateUser(userData);
            console.log("updatedata", response);
            if (response.code === 1000) {
                setLoading(false);
                return "Cập nhật thông tin người dùng thành công";
            }
        }catch (error) {
            setError(error?.message || "Đã xảy ra lỗi khi cập nhật thông tin người dùng.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return {
        updateUser,
        getUser,
        loading,
        error,
        user
    };
};

export default useUser;
