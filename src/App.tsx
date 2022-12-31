import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SingleLevel from "./pages/SingleLevel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/level/:level"} element={<SingleLevel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
