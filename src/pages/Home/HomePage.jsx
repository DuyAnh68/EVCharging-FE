import React from "react";
import StationSearch from "../../components/Home/StationSearch.jsx";
import StationMap from "../../components/Home/StationMap.jsx";

function HomePage() {
  return <div id="home-page">
      <StationSearch/>
      <StationMap/>
  </div>;
}

export default HomePage;
