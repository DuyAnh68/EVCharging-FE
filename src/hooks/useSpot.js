import { useState } from "react";
import spotApi from "../api/spotApi";

const useSpots = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSpotsByStationId = async (stationId) => {
    if (!stationId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await spotApi.getSpotsByStationId(stationId);
      console.log("res", response.data);
      setSpots(response);
    } catch (err) {
      console.error("Failed to fetch spots:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    spots,
    loading,
    error,
    getSpotsByStationId,
  };
};

export default useSpots;
