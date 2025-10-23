import React, { useState } from "react";

import paymentApi from "../api/paymentApi";

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPayment = async (paymentTransactionId) => {
    try {
      const response = await paymentApi.setPayment(paymentTransactionId);
      console.log("url12:", response);
      if (response) {
        
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
  return {
    loading,
    error,
    createPayment,
  };
};

export default usePayment;
