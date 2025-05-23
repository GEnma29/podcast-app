import {  Routes, Route, Navigate } from "react-router";
import Home from "../pages/home.page";

const RoutesEnum = {
    HOME: "/",
    FAVORITES: "/favorites",
    TRENDING: "/trending",
}

const PodcastRoutes = () => {
    return (
        <Routes>
        <Route path="/" element={<Navigate to={`${RoutesEnum.HOME}/${RoutesEnum.TRENDING}`} />} />
        <Route path={'/:tab'} element={<Home />} />
        </Routes>
    );
}

export default PodcastRoutes;
