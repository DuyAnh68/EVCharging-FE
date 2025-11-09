import axiosClient from "./axiosClient";

const invoiceApi = {
  getInvoiceBySessionId: (sessionId) =>
    axiosClient.get(`/api/invoices/session/${sessionId}`),
  postInvoiceById: (invoiceId) =>
    axiosClient.post(`/api/invoices/${invoiceId}`),
  getInvoiceByUserId: (userId) => axiosClient.get(`/api/invoices/user/${userId}`)
};

export default invoiceApi;
