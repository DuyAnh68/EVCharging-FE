import React from 'react'
import axiosClient from './axiosClient';

const paymentApi =  {
    setPayment: (paymentTransactionId) => axiosClient.post(`/member/payment-transaction/vn-pay?paymentTransactionId=${paymentTransactionId}`),
    getPaymentBySubscription: (subscriptionId) => axiosClient.post(`/member/payment-transaction/subscription/${subscriptionId}`)
};

export default paymentApi