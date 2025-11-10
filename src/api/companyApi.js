import axiosClient from "./axiosClient";

const companyApi = {
    getUserCompany: () => axiosClient.get(`/api/company/user/all`),
    getCompanyVehicle: () => axiosClient.get(`/api/company/vehicle/all`),
    getCompanyVehicleById: (id) => axiosClient.get(`/api/company/vehicle/${id}`),
    postCompanyVehicle: (data) => axiosClient.post(`/api/company/vehicle`, data),
}

export default companyApi;