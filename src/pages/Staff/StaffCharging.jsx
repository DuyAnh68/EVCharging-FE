import { use, useEffect, useState } from "react";
import useVehicle from "../../hooks/useVehicle";
import { Search, Car, User, Battery, PlugZap } from "lucide-react";
import { useParams } from "react-router-dom";

export default function StaffCharging() {
  const { getAllVehicle } = useVehicle();
  const [vehicles, setVehicles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const spotId = useParams().id;
  console.log(spotId);

  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await getAllVehicle();
      if (res) {
        setVehicles(res);
        setFiltered(res);
      }
    };
    fetchVehicles();
  }, []);

  // 🔍 Search Filter
  useEffect(() => {
    const q = search.toLowerCase().trim();
    const list = availableVehicles.filter((v) => {
      const owner = v.owner?.fullName?.toLowerCase() || "";
      const phone = v.owner?.phone || "";
      const plate = v.licensePlate.toLowerCase();

      return plate.includes(q) || owner.includes(q) || phone.includes(q);
    });

    setFiltered(list);
  }, [search, vehicles]);

  const availableVehicles = vehicles.filter(
    (v) => v.vehicleSubscriptionResponse.status === "ACTIVE"
  );
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Phiên sạc thủ công
      </h1>

      {/* Search Bar */}
      <div className="max-w-xl mb-6 flex items-center gap-3 bg-white rounded-xl shadow px-4 py-3">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Tìm kiếm xe theo biển số"
          className="flex-1 outline-none text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table Layout */}
      <div className="overflow-auto shadow rounded-xl bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Plate</th>
              <th className="p-3">Model</th>
              <th className="p-3">Connector</th>
              <th className="p-3">Battery</th>
              <th className="p-3">Subscription</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((v) => (
              <tr
                key={v.id}
                onClick={() => setSelected(v)}
                className={`cursor-pointer hover:bg-green-50 transition ${
                  selected?.id === v.id ? "bg-green-100" : ""
                }`}
              >
                <td className="p-3 font-medium text-gray-800">
                  {v.licensePlate}
                </td>

                <td className="p-3">
                  {v.model.brandName} {v.model.modelName}
                </td>
                <td className="p-3">{v.model.connector}</td>
                <td className="p-3">{v.model.batteryCapacity} kWh</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      v.vehicleSubscriptionResponse.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {v.vehicleSubscriptionResponse.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="mt-10 p-6 bg-white rounded-2xl shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Selected Vehicle
          </h2>

          <p className="text-xl font-medium">{selected.licensePlate}</p>
          <p className="text-gray-600">
            {selected.model.brandName} – {selected.model.modelName}
          </p>

          <button className="w-full mt-6 py-4 text-lg bg-green-500 hover:bg-green-600 transition rounded-xl text-white font-semibold">
            Start Charging Session
          </button>
        </div>
      )}
    </div>
  );
}
