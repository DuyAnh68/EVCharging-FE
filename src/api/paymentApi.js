import React from 'react'
import axiosClient from './axiosClient';

const paymentApi =  {
    setPayment: (paymentTransactionId) => axiosClient.get("/payment/vn-pay", {params: { paymentTransactionId }})
};

export default paymentApi