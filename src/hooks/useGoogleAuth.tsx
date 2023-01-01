import { Auth, getAuth, signOut } from "firebase/auth";
import React, { useEffect } from "react";

type Props = {};

const useGoogleAuth = (auth: Auth) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  useEffect(() => {
    getAuth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
      } else {
        signOut(getAuth());
        setIsLoggedIn(false);
      }
    });
  }, [auth, isLoggedIn]);

  return {
    isLoggedIn,
  };
};

export default useGoogleAuth;
