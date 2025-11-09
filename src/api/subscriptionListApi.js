import axiosClient from "./axiosClient";

const subscriptionListApi = {
  getSubscriptions: () => axiosClient.get("/admin/subscription-plan"),
  getSubscriptionById: (subscriptionId) =>
    axiosClient.get(`/admin/subscription-plan/${subscriptionId}`),
};

export default subscriptionListApi;
