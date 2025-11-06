import axiosClient from "./axiosClient";

const invoiceApi = {
  getInvoiceBySessionId: (sessionId) =>
    axiosClient.get(`/api/invoices/session/${sessionId}`),
  postInvoiceById: (invoiceId) =>
    axiosClient.post(`/api/invoices/${invoiceId}`),
};

export default invoiceApi;
