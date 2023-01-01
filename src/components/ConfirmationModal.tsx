import React from "react";

type Props = {
  onAccept: () => Promise<void> | void;
  onDecline: () => void;
};

const ConfirmationModal = (props: Props) => {
  return (
    <div className="fixed inset-0 bg-[#000000c4] flex justify-center items-center w-full z-20 text-black">
      <div className=" max-w-[500px]">
        <div className="bg-white rounded-lg p-5">
          <h1 className="text-center text-xl font-bold">Are you sure?</h1>
          <p className="text-center text-sm mt-2">
            You will be logged out of your account.
          </p>
          <div className="flex justify-center mt-5">
            <button
              className="bg-[#E23B43] text-white font-bold py-2 px-4 rounded-lg mr-2"
              onClick={props.onAccept}
            >
              Yes
            </button>
            <button
              className=" text-black font-bold py-2 px-4 rounded-lg"
              onClick={props.onDecline}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
