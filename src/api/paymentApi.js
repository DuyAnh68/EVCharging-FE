import React from 'react'
import axiosClient from './axiosClient';

const paymentApi =  {
    setPayment: (paymentTransactionId) => axiosClient.post(`/paymentTransaction/vn-pay?paymentTransactionId=${paymentTransactionId}`),
    getPaymentBySubscription: (subscriptionId) => axiosClient.post(`/paymentTransaction/subscription/${subscriptionId}`)
};

export default paymentApi