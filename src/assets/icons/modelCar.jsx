import React from "react";

const ModelCar = ({ imageUrl, modelName }) => {
  // fallback nếu không có ảnh
  const fallbackImage = "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div className="rounded-2xl shadow-md bg-white hover:shadow-lg transition">
      <img
        src={imageUrl || fallbackImage}
        alt={modelName || "Xe điện"}
        className="w-full h-48 "
        // object-cover
        onError={(e) => (e.target.src = fallbackImage)}
      />

    </div>
  );
};

export default ModelCar;
