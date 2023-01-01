import React from "react";
import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Widgets from "../components/Widgets";
import { auth } from "../firebase";
import useGoogleAuth from "../hooks/useGoogleAuth";
import useNetwork from "../hooks/useNetwork";
import HomePage from "../pages/HomePage";

type Props = {};

const PrivateRoute = (props: Props) => {
  const { isLoggedIn } = useGoogleAuth(auth);

  const navigate = useNavigate();
  const location = useLocation();
  if (isLoggedIn && location.pathname === "/") navigate("/home");
  return (
    <>
      <Header />
      <Widgets />
      {isLoggedIn ? (
        <>
          <Outlet />
        </>
      ) : (
        <HomePage />
      )}
      <Footer />
    </>
  );
};

export default PrivateRoute;
