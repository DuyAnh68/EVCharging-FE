import axiosClient from "./axiosClient";

const vehicleListApi = {
    getVehicleList: () => axiosClient.get("/vehicle/user"),
    addVehicle: (credentials) => axiosClient.post("/vehicle", credentials),
    getVehicleByBrand: (brandName) => axiosClient.get("/model", { params: {brand: brandName}}),
};

export default vehicleListApi