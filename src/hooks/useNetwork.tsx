import React from "react";

const useNetwork = () => {
  const network: boolean = window.navigator.onLine;
  return {
    network,
  };
};

export default useNetwork;
