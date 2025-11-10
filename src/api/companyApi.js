import axiosClient from "./axiosClient";

const companyApi = {
    getUserCompany: () => axiosClient.get(`/api/company/user/all`),
}

export default companyApi;