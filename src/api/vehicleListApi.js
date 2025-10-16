import axiosClient from "./axiosClient";

const vehicleListApi = {
    getVehicleList: () => axiosClient.get("/vehicle"),
};

export default vehicleListApi