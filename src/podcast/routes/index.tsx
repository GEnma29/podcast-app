import { Routes, Route, Navigate } from "react-router";
import Home from "../pages/home.page";

const RoutesEnum = {
    HOME: "/",
    DEFAULT_TAB: "trending",
    FAVORITES: "favorites",
};

const PodcastRoutes = () => {
    return (
        <Routes>
            <Route path={`${RoutesEnum.HOME}:tab?`} element={<Home />} />

            <Route path={RoutesEnum.HOME} element={<Navigate to={`${RoutesEnum.HOME}${RoutesEnum.DEFAULT_TAB}`} replace />} />
        </Routes>
    );
};

export default PodcastRoutes;