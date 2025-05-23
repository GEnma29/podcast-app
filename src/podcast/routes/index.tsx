import { Routes, Route, Navigate } from "react-router";
import Home from "../pages/home.page";

const RoutesEnum = {
    HOME: "/",
    DEFAULT_TAB: "trending", // Tab por defecto
};

const PodcastRoutes = () => {
    return (
        <Routes>
            {/* Ruta principal con parámetro opcional */}
            <Route path={`${RoutesEnum.HOME}:tab?`} element={<Home />} />

            {/* Redirección desde la raíz al home con tab trending */}
            <Route path={RoutesEnum.HOME} element={<Navigate to={`${RoutesEnum.HOME}${RoutesEnum.DEFAULT_TAB}`} replace />} />
        </Routes>
    );
};

export default PodcastRoutes;