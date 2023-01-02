import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useGetWordsByLevelQuery } from "../redux/services/words";
import { Word } from "../types/words.types";
import Loading from "./Loading";

type Props = {
  level: number;
  ref?: React.LegacyRef<HTMLDivElement> | undefined;
};

const NLevels = (props: Props) => {
  const { ref, inView } = useInView({});

  const {
    data: nLevelData,
    isError: isErrorNLevel,
    isFetching: isFetchingNLevel,
    isLoading: isLoadingNLevel,
  } = useGetWordsByLevelQuery(props.level, {
    skip: !inView,
  });

  if (isLoadingNLevel || isFetchingNLevel) return <Loading />;
  if (isErrorNLevel) return <p>Something went wrong</p>;

  return (
    <div id="level">
      <h1 className="text-4xl font-bold text-center">Level {props.level}</h1>
      <div ref={ref} className="p-6 m-10">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))]">
          {nLevelData?.words.map((word: Word) => (
            <div
              key={word.word}
              className="bg-[#092031] m-4 p-4 rounded-lg hover:scale-105 cursor-pointer hover:shadow-[3px_3px_0px_0px_#E23B43]  duration-200"
            >
              <p>
                <span className="font-bold text-[#E23B43]"> Word:</span>{" "}
                {word.word}
              </p>
              <p>
                <span className="font-bold text-[#E23B43]"> Furigana:</span>{" "}
                {word.furigana}
              </p>
              <p>
                <span className="font-bold text-[#E23B43]"> Meaning:</span>{" "}
                {word.meaning}
              </p>
              <p>
                <span className="font-bold text-[#E23B43]"> Romaji:</span>{" "}
                {word.romaji}
              </p>
              <p>
                <span className="font-bold text-[#E23B43]"> Level:</span>{" "}
                {word.level}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to={`/level/${props.level}`}
            className="px-10 py-2 bg-[#E23B43] rounded-lg font-bold cursor-pointer hover:scale-105 duration-200 hover:shadow-[3px_3px_0px_0px_#f79090]"
          >
            View More.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NLevels;
