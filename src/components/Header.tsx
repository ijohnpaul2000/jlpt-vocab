import React, { useEffect, useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { MdOutlineLogout } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal";
import { auth } from "../firebase";
import useGoogleAuth from "../hooks/useGoogleAuth";
import * as crypto from "crypto-js";
const provider = new GoogleAuthProvider();
type Props = {};

interface HeaderData {
  title: string;
  link: string;
  onClick?: () => Promise<void>;
}

const Header = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useGoogleAuth(auth);
  const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

  const headerData: HeaderData[] = [
    {
      title: "N1",
      link: "/level/1",
    },
    {
      title: "N2",
      link: "/level/2",
    },
    {
      title: "N3",
      link: "/level/3",
    },
    {
      title: "N4",
      link: "/level/4",
    },
    {
      title: "N5",
      link: "/level/5",
    },
  ];

  async function login() {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = crypto.AES.encrypt(
        JSON.stringify(result.user),
        ENCRYPTION_KEY!
      ).toString();

      localStorage.setItem("user", user);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      setIsOpen(false);
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredentuseial type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  }

  return (
    <div className="h-[60px] w-full bg-[#E23B43] flex items-center justify-center px-5">
      <div className="max-w-[1400px] w-full h-full flex items-center justify-between">
        <h1
          className="text-white font-incosolata text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          語彙 <span className="text-white font-bold text-2xl">JLPT</span>
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex">
          {headerData.map((item) => (
            <React.Fragment key={item.title}>
              <li
                onClick={() => navigate(item.link)}
                className="text-white hover:bg-[#092031] rounded-lg hover:text-[#E23B43] font-incosolata text-base cursor-pointer py-2 px-4 "
              >
                {item.title}
              </li>
            </React.Fragment>
          ))}
          <li
            onClick={() => {
              isLoggedIn ? navigate("/profile") : login();
            }}
            className={`${
              isLoggedIn ? "bg-[#092031]" : ""
            } text-white hover:bg-[#092031] rounded-lg hover:text-[#E23B43] font-incosolata text-base cursor-pointer py-2 px-4 ml-2`}
          >
            {isLoggedIn ? auth.currentUser?.displayName : "Test My Skill!"}
          </li>
          {isLoggedIn && (
            <li
              onClick={() => setConfirmationModal(true)}
              className={`ml-5 text-white hover:bg-[#092031] rounded-lg hover:text-[#E23B43] font-incosolata text-xl cursor-pointer py-2 px-4`}
            >
              <MdOutlineLogout size={25} />
            </li>
          )}
        </ul>

        <HiOutlineBars3BottomRight
          size={25}
          color={"white"}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer md:hidden"
        />
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 flex items-center text-center bg-black ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }
        duration-300 ease-in-out z-10`}
      >
        <IoCloseOutline
          size={25}
          color={"white"}
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-5 right-8 cursor-pointer "
        />
        <ul className="w-full">
          {headerData.map((item) => (
            <React.Fragment key={item.link}>
              <li
                onClick={() => {
                  navigate(item.link);
                  setIsOpen(!isOpen);
                }}
              >
                {item.title}
              </li>
            </React.Fragment>
          ))}
          <li
            onClick={() => {
              if (isLoggedIn) {
                navigate("/profile");
                setIsOpen(!isOpen);
              } else {
                login();
              }
            }}
            className={` text-white hover:bg-[#092031] rounded-lg mx-1 hover:text-[#E23B43] font-incosolata text-xl cursor-pointer py-2 px-4`}
          >
            {isLoggedIn ? auth.currentUser?.displayName : "Test My Skill!"}
          </li>
          {isLoggedIn && (
            <li
              onClick={() => {
                setConfirmationModal(true);
                setIsOpen(!isOpen);
              }}
              className={`text-white hover:bg-[#092031] mx-1 rounded-lg hover:text-[#E23B43] font-incosolata text-xl cursor-pointer py-2 px-4`}
            >
              Sign Out
            </li>
          )}
        </ul>
      </div>
      {confirmationModal && (
        <ConfirmationModal
          onAccept={() => {
            localStorage.removeItem("user");
            signOut(getAuth());
            setConfirmationModal(false);
          }}
          onDecline={() => {
            setConfirmationModal(false);
            setIsOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default Header;
