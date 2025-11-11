import axiosClient from './axiosClient';

const paymentApi = {
    setPayment: (paymentTransactionId) => axiosClient.post(`/api/payment-transaction/vn-pay?paymentTransactionId=${paymentTransactionId}`),
    getPaymentBySubscription: (subscriptionId) => axiosClient.post(`/api/payment-transaction/subscription/${subscriptionId}`),
    getPaymentHistory: () => axiosClient.get('/api/payment-transaction'),
    
};

export default paymentApi