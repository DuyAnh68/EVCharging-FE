import axiosClient from "./axiosClient";

const paymentInvoicesApi = {
    getPaymentInvoicesId: (id) => axiosClient.get(`/api/admin/payment/user/${id}`),
    doPaymentInvoices: (id) => axiosClient.post(`/api/payment-transaction/payment/${id}`),
};

export default paymentInvoicesApi;