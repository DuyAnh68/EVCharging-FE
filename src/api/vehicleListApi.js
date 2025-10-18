import axiosClient from "./axiosClient";

const vehicleListApi = {
    getVehicleList: () => axiosClient.get("/vehicle"),
    addVehicle: () => axiosClient.post("vehicle")
};

export default vehicleListApi