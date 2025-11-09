import axiosClient from './axiosClient';

const paymentApi = {
    setPayment: (paymentTransactionId) => axiosClient.post(`/api/member/payment-transaction/vn-pay?paymentTransactionId=${paymentTransactionId}`),
    getPaymentBySubscription: (subscriptionId) => axiosClient.post(`/api/member/payment-transaction/subscription/${subscriptionId}`),
    getPaymentHistory: () => axiosClient.get('/api/member/payment-transaction'),
    
};

export default paymentApi