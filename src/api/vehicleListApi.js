import axiosClient from "./axiosClient";

const vehicleListApi = {
    getVehicleList: () => axiosClient.get("/vehicle/user"),
    addVehicle: (credentials) => axiosClient.post("/vehicle", credentials),
    getVehicleByBrand: (brandName) => axiosClient.get("/model", { params: {brand: brandName}}),
    getVehicleById: (id) => axiosClient.get(`/vehicle/${id}`)  
};

export default vehicleListApi