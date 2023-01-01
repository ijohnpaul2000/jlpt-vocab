import React, { useEffect, useState } from "react";
import { ImGoogle, ImFacebook, ImLinkedin } from "react-icons/im";
import { HiOutlineCode } from "react-icons/hi";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { useNavigate } from "react-router-dom";
const provider = new GoogleAuthProvider();

const Widgets = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useGoogleAuth(auth);

  async function login() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      navigate("/profile");
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }
  return (
    <div className="flex flex-col justify-between fixed top-[50%] left-0 bottom-[50%] translate-y-[-50%] ml-2 min-h-[150px] bg-[#E23B43] p-1 rounded-full z-10">
      <div
        className={`p-2 rounded-full bg-[#092031] hover:scale-110 duration-200 cursor-pointer  ${
          isLoggedIn ? "pointer-events-none bg-[#092031a5]" : ""
        }`}
        onClick={login}
      >
        <ImGoogle size={15} color={"#ffffff"} />
      </div>
      <div className="p-2 rounded-full bg-[#092031] hover:scale-110 duration-200 cursor-pointer">
        <a href={"https://www.facebook.com/ijohnpaul23"} target={"_blank"}>
          <ImFacebook size={15} color={"#ffffff"} />
        </a>
      </div>
      <div className="p-2 rounded-full bg-[#092031] hover:scale-110 duration-200 cursor-pointer">
        <a href="https://www.linkedin.com/in/jp-pineda/" target={"_blank"}>
          <ImLinkedin size={15} color={"#ffffff"} />
        </a>
      </div>
      <div className="p-2 rounded-full bg-[#092031] hover:scale-110 duration-200 cursor-pointer">
        <a href="https://devpinedajp.vercel.app/" target={"_blank"}>
          <HiOutlineCode size={15} color={"#ffffff"} />
        </a>
      </div>
    </div>
  );
};

export default Widgets;
