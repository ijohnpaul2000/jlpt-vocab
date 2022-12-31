import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.75)] z-10">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
