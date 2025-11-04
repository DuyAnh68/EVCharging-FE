const sessionApi = {
    getSessionsByVehicleId: (vehicleId) => `/api/charging-sessions/vehicle/${vehicleId}`,
};

export default sessionApi;