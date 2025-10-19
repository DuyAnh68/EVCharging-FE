import axiosClient from "./axiosClient"; 

const subscriptionListApi = {
    getSubcriptions: () => axiosClient.get("/subscription-plan"),
}