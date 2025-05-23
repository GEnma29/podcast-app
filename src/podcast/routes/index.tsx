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
          <Route path={RoutesEnum.HOME} element={<Navigate to={`${RoutesEnum.HOME}/trending`} />} />
          <Route path={`${RoutesEnum.HOME}/:tab`} element={<Home />} />
        </Routes>
    );
}

export default PodcastRoutes;
