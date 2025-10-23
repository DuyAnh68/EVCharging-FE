import axiosClient from "./axiosClient"; 

const subscriptionListApi = {
    getSubscriptions: () => axiosClient.get("/subscription-plan"),
    getSubscriptionById: (subscriptionId) => axiosClient.get("/subscription-plan/", { params: {id: subscriptionId }})
};

export default subscriptionListApi;