import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

type Props = {
  searchedWord: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WordNotFound: React.FC<Props> = ({
  setIsOpen,
  isOpen,
  searchedWord,
}): JSX.Element => {
  return ReactDOM.createPortal(
    <div
      className={`duration-200 text-white z-50 fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center flex-col px-7 `}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div className="bg-[#E23B43] px-10 py-6 rounded-lg max-w-[500px]">
        <p className="mb-4">
          {" "}
          <span className="font-bold">{searchedWord}</span> can't be found!
        </p>
      </div>
    </div>,
    document.getElementById("error-root") as HTMLElement
  );
};

export default WordNotFound;
