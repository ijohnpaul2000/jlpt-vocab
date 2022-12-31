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
const provider = new GoogleAuthProvider();
type Props = {};

const Header = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const headerData = [
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

  useEffect(() => {
    getAuth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("user is logged in");
        setIsLoggedIn(true);
      } else {
        console.log("user is logged out");
        signOut(getAuth());
        setIsLoggedIn(false);
      }
    });
  }, [auth, isLoggedIn]);

  async function login() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
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

  console.log(isLoggedIn);

  return (
    <div className="h-[60px] w-full bg-[#E23B43] flex items-center justify-center px-5">
      <button onClick={() => signOut(getAuth())}>signout</button>
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
            <li
              onClick={() => navigate(item.link)}
              key={item.link}
              className="text-white hover:bg-[#092031] rounded-lg hover:text-[#E23B43] font-incosolata text-xl cursor-pointer py-2 px-4"
            >
              {item.title}
            </li>
          ))}
          <li
            onClick={isLoggedIn ? () => signOut(getAuth()) : login}
            className={`text-white hover:bg-[#092031] rounded-lg hover:text-[#E23B43] font-incosolata text-xl cursor-pointer py-2 px-4`}
          >
            {isLoggedIn ? auth.currentUser?.displayName : "Test My Skill!"}
          </li>
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
            <li
              onClick={() => {
                navigate(item.link);
                setIsOpen(!isOpen);
              }}
              key={item.link}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
