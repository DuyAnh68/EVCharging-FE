import { useState } from "react";
import sessionApi from "../api/sessionApi";

const useSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState(null);

  const getVehicleSession = async (vehicleId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sessionApi.getSessionsByVehicleId(vehicleId);
      if (response) {
        setLoading(false);
        return response;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };

  const startSession = async (bookingId, startData) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        spotId: startData.spotId,
        percentBefore: startData.percentBefore,
      };

      const response = await sessionApi.startSession(bookingId, payload);
      if (response) {
        setLoading(false);
        return response;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };

  const endSession = async (sessionId, endData) => {
    setLoading(true);
    setError(null);
    console.log(endData);
    console.log(sessionId);
    try {
      const payload = {
        ratePerKWh: endData.ratePerKWh,
        batteryCapacity: endData.batteryCapacity,
        percentBefore: endData.percentBefore,
      };
      const response = await sessionApi.endSession(sessionId, payload);
      if (response) {
        console.log("end response", response);
        setLoading(false);
        return response;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };

  const startSessionOnStation = async (startData) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        spotId: startData.spotId,
        userId: startData.userId,
        vehicleId: startData.vehicleId,
        stationId: startData.stationId,
        percentBefore: startData.percentBefore,
      };

      const response = await sessionApi.startSessionOnStation(payload);
      if (response) {
        setLoading(false);
        return response;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };

  const endSessionOnStation = async (sessionId, endData) => {
    setLoading(true);
    setError(null);
    console.log(endData);
    console.log(sessionId);
    try {
      const payload = {
        ratePerKWh: endData.ratePerKWh,
        batteryCapacity: endData.batteryCapacity,
        percentBefore: endData.percentBefore,
      };
      const response = await sessionApi.endSessionOnStation(sessionId, payload);
      if (response) {
        console.log("end response", response);
        setLoading(false);
        return response;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };

  const startSessionStaff = async (startData) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        spotId: startData.spotId,
        percentBefore: startData.percentBefore,
      };

      const response = await sessionApi.startSessionStaff(payload);
      if (response) {
        setLoading(false);
        return response;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };

  const endSessionStaff = async (sessionId, endData) => {
    setLoading(true);
    setError(null);
    console.log("endData:", endData);
    try {
      const payload = {
        ratePerKWh: endData.ratePerKwh,
        batteryCapacity: endData.batteryCapacity,
        percentBefore: endData.percentBefore,
      };

      const response = await sessionApi.endSessionStaff(sessionId, payload);
      if (response) {
        setLoading(false);
        console.log(response);
        return response;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };
  const getAllSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await sessionApi.getAllSession();
      if (response) {
        setLoading(false);
        setSessions(response);
        console.log(sessions);
        return response;
      }
    } catch (e) {
      setError(e.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllSession,
    startSessionStaff,
    endSessionOnStation,
    startSessionOnStation,
    getVehicleSession,
    startSession,
    endSession,
    loading,
    error,
    sessions,
    endSessionStaff,
  };
};

export default useSession;
