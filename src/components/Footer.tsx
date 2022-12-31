import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-[#051017] py-8 h-[40px] fixed bottom-0 w-full flex items-center justify-center border-t-[0.5px] border-white">
      <div className="text-center">
        <p>語彙 JLPT</p>
        Created By: {"<Paul/>"}{" "}
      </div>
    </footer>
  );
};

export default Footer;
