import axiosClient from "./axiosClient";

const vehicleListApi = {
    getVehicleList: () => axiosClient.get("/vehicle/user"),
    addVehicle: () => axiosClient.post("vehicle"),
    getVehicleByBrand: (brandName) => axiosClient.get("/model", { params: {brand: brandName}}),
};

export default vehicleListApi