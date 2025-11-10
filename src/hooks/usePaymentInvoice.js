import { useState } from "react";
import paymentInvoicesApi from "../api/paymentInvoices";

const usePaymentInvoice = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPaymentInvoice = async (id) => {
        setLoading(true);
        setError(null)
        try {
            const response = await paymentInvoicesApi.getPaymentInvoicesId(id);
            if (response) {
                setLoading(false);
                return response.result;
            }
        } catch (error) {
            setError(error);
            return error;
        } finally {
            setLoading(false);
        }
    };

    const doPaymentInvoice = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await paymentInvoicesApi.doPaymentInvoices(id);
            console.log("res:", response);
            if (response) {
                setLoading(false);
                return response.result;
            }
        } catch (error) {
            setError(error);
            return error;
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        error,
        createPaymentInvoice,
        doPaymentInvoice
    };
};
export default usePaymentInvoice;
