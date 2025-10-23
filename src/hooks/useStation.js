import { useState, useEffect } from "react";
import stationApi from "../api/stationApi";

const useStation = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [station, setStation] = useState(null);

  const fetchStations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await stationApi.getStation();
      console.log("station", response);
      setStations(response?.data || response);
    } catch (err) {
      console.error("Fetch stations failed:", err);
      setError(err.message || "Không thể tải danh sách trạm sạc.");
    } finally {
      setLoading(false);
    }
  };

  const getStationById = async (id) => {
    try {
      setLoading(true);
      const res = await stationApi.getStationById(id);
      console.log("res", res);
      setStation(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return {
    station,
    getStationById,
    stations,
    loading,
    error,
    refetch: fetchStations, // nếu cần gọi lại thủ công
  };
};

export default useStation;
