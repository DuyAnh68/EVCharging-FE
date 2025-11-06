import axiosClient from "./axiosClient";

const paymentInvoicesApi = {
    getPaymentInvoicesId: (id) => axiosClient.get(`/admin/payment/user/${id}`),
    doPaymentInvoices: (id) => axiosClient.post(`/member/payment-transaction/payment/${id}`),
};

export default paymentInvoicesApi;