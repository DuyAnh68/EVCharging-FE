import React from 'react'
import axiosClient from './axiosClient';

const paymentApi =  {
    setPayment: (paymentTransactionId) => axiosClient.post(`/payment-transaction/vn-pay?paymentTransactionId=${paymentTransactionId}`),
    getPaymentBySubscription: (subscriptionId) => axiosClient.post(`/payment-transaction/subscription/${subscriptionId}`)
};

export default paymentApi