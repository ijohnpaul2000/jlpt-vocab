import React from "react";
import { useInView } from "react-intersection-observer";
import NLevels from "../components/NLevels";
import { useGetWordsByLevelQuery } from "../redux/services/words";

type Props = {};

const Levels = (props: Props) => {
  const levels = [1, 2, 3, 4, 5];
  return (
    <div className="mt-52">
      {levels.map((level) => {
        return <NLevels level={level} key={level} />;
      })}
    </div>
  );
};

export default Levels;
