import axiosClient from "./axiosClient";

const sessionApi = {
  getSessionsByVehicleId: (vehicleId) =>
    axiosClient.get(`/api/charging-sessions/vehicle/${vehicleId}`),
  startSession: (bookingId, startData) =>
    axiosClient.post(`api/charging-sessions/start/${bookingId}`, startData),
  endSession: (sessionId, endData) =>
    axiosClient.put(`/api/charging-sessions/end/${sessionId}`, endData),
};

export default sessionApi;
