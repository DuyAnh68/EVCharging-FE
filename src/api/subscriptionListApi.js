import axiosClient from "./axiosClient";

const subscriptionListApi = {
  getSubscriptions: () => axiosClient.get("/api/admin/subscription-plan"),
  getSubscriptionById: (subscriptionId) =>
    axiosClient.get(`/api/admin/subscription-plan/${subscriptionId}`),
};

export default subscriptionListApi;
