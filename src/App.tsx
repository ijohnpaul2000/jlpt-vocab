import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./layouts/PrivateRoute";
import HomePage from "./pages/HomePage";
import SingleLevel from "./pages/SingleLevel";
import Profile from "./pages/Profile";
import Tests from "./pages/Tests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<PrivateRoute />}>
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/tests/level/:level"} element={<Tests />} />
        </Route>
        <Route path={"/level/:level"} element={<SingleLevel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
