import { useState } from "react";
import paymentApi from "../api/paymentApi";

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPayment = async (subscriptionId) => {
    setLoading(true);
    setError(null);
    try{
      const response = await paymentApi.getPaymentBySubscription(subscriptionId);
      console.log("response", response);
      if(response){
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

  const createPayment = async (paymentTransactionId) => {
    setLoading(true);
    setError(null);
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

  const getPaymentHistory = async () => {
  setLoading(true);
  setError(null);
  try{
    const response = await paymentApi.getPaymentHistory();
    console.log("paymentHistory..", response);
    if(response){
      setLoading(false);
      return response.result;
    }
  }catch (e) {
    setError(e.message);
    return e.message;
  } finally {
    setLoading(false);
  }
}
  return {
    getPaymentHistory,
    loading,
    error,
    createPayment,
    getPayment
  };
};



export default usePayment;
