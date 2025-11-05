import axiosClient from "./axiosClient";

const sessionApi = {
    getSessionsByVehicleId: (vehicleId) => axiosClient.get(`/api/charging-sessions/vehicle/${vehicleId}`),
};

export default sessionApi;