import { BrowserRouter } from "react-router";
import PodcastRoutes from "./podcast/routes";

function App() {
  return (
    <BrowserRouter>
      <PodcastRoutes />
    </BrowserRouter>
  );
}

export default App;
