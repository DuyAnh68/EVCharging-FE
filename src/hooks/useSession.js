import { useState } from "react";
import sessionApi from "../api/sessionApi";

const useSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getVehicleSession = async (vehicleId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sessionApi.getSessionsByVehicleId(vehicleId);
      if (response) {
        setLoading(false);
        return JSON.parse(response);
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

  return {
    getVehicleSession,
    startSession,
    endSession,
    loading,
    error,
  };
};

export default useSession;
