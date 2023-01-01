import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import useNetwork from "../hooks/useNetwork";

type Props = {};

const Error = (props: Props) => {
  const { network } = useNetwork();
  return ReactDOM.createPortal(
    <div className="text-white z-50 fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center flex-col px-7">
      <div className="bg-[#E23B43] px-10 py-6 rounded-lg max-w-[500px]">
        <p className="mb-4">
          {network
            ? " If you see this modal. It's either the APIs are dead or Something went wrong."
            : "No internet connection. You may want to connect to the internet in order to use the website."}
        </p>
        <Link
          to={"/"}
          className="color-white underline underline-offset-4 hover:cursor-pointer"
        >
          {network ?? "Back To Home"}
        </Link>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Error;
