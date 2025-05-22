import {  Routes, Route } from "react-router";
import Home from "../pages/home.page";

const RoutesEnum = {
    HOME: "/",
    FAVORITES: "/favorites",
}

const PodcastRoutes = () => {
    return (
        <Routes>
        <Route path={`${RoutesEnum.HOME}/:tab`} element={<Home />} />
        </Routes>
    );
}

export default PodcastRoutes;
