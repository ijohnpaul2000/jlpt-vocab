import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./layouts/PrivateRoute";
import HomePage from "./pages/HomePage";
import SingleLevel from "./pages/SingleLevel";
import Profile from "./pages/Profile";
import Tests from "./pages/Tests";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<PrivateRoute />}>
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/tests/level/:level"} element={<Tests />} />
        </Route>
        <Route path={"/level/:level"} element={<SingleLevel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
