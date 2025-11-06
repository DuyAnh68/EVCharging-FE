import { useState } from "react";
import invoiceApi from "../api/invoiceApi";

const useInvoice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const getInvoiceBySessionId = async (sessionId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await invoiceApi.getInvoiceBySessionId(sessionId);
      if (response) {
        return response.id;
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching invoice:", err);
    } finally {
      setLoading(false);
    }
  };

  const postInvoiceById = async (invoiceId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await invoiceApi.postInvoiceById(invoiceId);
      if (response) {
        return response;
      }
    } catch (err) {
      setError(err.message);
      console.error("Error posting invoice:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    invoice,
    getInvoiceBySessionId,
    postInvoiceById,
  };
};

export default useInvoice;
