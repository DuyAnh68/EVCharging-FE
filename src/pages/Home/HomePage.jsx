import React, {useEffect} from "react";
import StationSearch from "../../components/Home/StationSearch.jsx";
import StationMap from "../../components/Home/StationMap.jsx";
import StationList from "../../components/Home/StationList.jsx";
import {useAppDispatch, useAppSelector} from "../../store/index.js";
import {fetchStations, selectAllStations, selectLoading} from "../../store/slices/chargingStationSlice.js";

function HomePage() {
    const dispatch = useAppDispatch();
    const stations = useAppSelector(selectAllStations);
    const stationLoading = useAppSelector(selectLoading);

    const [keyword, setKeyword] = React.useState("");
    const [debouncedKeyword, setDebouncedKeyword] = React.useState("");

    const onSearch = (keyword) => {
        dispatch(fetchStations({keyword}));
    };

    const onSearchKeywordChange = (keyword) => {
        setKeyword(keyword);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 1000);
        return () => clearTimeout(timer);
    }, [keyword]);

    useEffect(() => {
        dispatch(fetchStations({keyword: debouncedKeyword}));
    }, [dispatch, debouncedKeyword]);

    return <div id="home-page">
        <StationSearch value={keyword} onChange={onSearchKeywordChange} onSearch={onSearch}/>
        <StationMap/>
        <StationList data={stations} loading={stationLoading}/>
    </div>;
}

export default HomePage;
