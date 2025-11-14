import axiosClient from "./axiosClient";

const invoiceApi = {
  getInvoiceBySessionId: (sessionId) =>
    axiosClient.get(`/api/invoices/session/${sessionId}`),
  postInvoiceById: (invoiceId) =>
    axiosClient.post(`/api/invoices/${invoiceId}`),
  getInvoiceByUserId: (userId) =>
    axiosClient.get(`/api/invoices/user/${userId}`),
  confirmPaidInvoice: (invoiceId) =>
    axiosClient.put(`/api/invoices/${invoiceId}/confirm-paid`),
  getStaffInvoice: () => axiosClient.get("/api/invoices/staff"),
};

export default invoiceApi;
