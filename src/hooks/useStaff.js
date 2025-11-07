import { useState } from "react";
import staffApi from "../api/staffApi";

const useStaff = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const startSessionStaff = async (startData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await staffApi.startSessionStaff(startData);
            return response;
        } catch (error) {
            setError(error);
            console.error("Error fetching startSessionStaff:", error);
        } finally {
            setLoading(false);
        }
    };

    const endSessionStaff = async (sessionId, endData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await staffApi.endSessionStaff(sessionId, endData);
            return response;
        } catch (error) {
            setError(error);
            console.error("Error fetching endSessionStaff:", error);
        } finally {
            setLoading(false);
        }
    };

    return { 
        loading, 
        error,
        startSessionStaff,
        endSessionStaff
    };
};

export default useStaff;
