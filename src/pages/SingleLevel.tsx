import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useGetWordsByOffsetLimitLevelQuery } from "../redux/services/words";
import { Word } from "../types/words.types";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi";
import Loading from "../components/Loading";
import Error from "../components/Error";

type Props = {};

const SingleLevel = (props: Props) => {
  const { level } = useParams();

  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(30);
  const [totalPages, setTotalPages] = useState<number>(0);

  const {
    data: sLevelData,
    isLoading: isLoadingSLevel,
    isFetching: isFetchingSLevel,
    isError: isErrorSLevel,
  } = useGetWordsByOffsetLimitLevelQuery({
    offset,
    limit,
    level,
  });

  function calculateTotalPages() {
    setTotalPages(Math.ceil(sLevelData?.total / limit));
  }
  useEffect(() => {
    calculateTotalPages();
  }, [sLevelData?.total]);

  return (
    <>
      {(isLoadingSLevel || isFetchingSLevel) && <Loading />}
      {isErrorSLevel && <Error />}

      {/* PAGINATION */}
      <div className="flex justify-center my-3">
        <button
          onClick={() => setOffset(0)}
          className="bg-[#E23B43] text-white p-2 rounded-lg m-2 disabled:bg-[#092031]"
          disabled={offset === 0}
        >
          <HiChevronDoubleLeft />
        </button>
        <button
          onClick={() => setOffset(offset === 0 ? 0 : offset - 1)}
          className="bg-[#E23B43] text-white p-2 rounded-lg m-2 disabled:bg-[#092031]"
          disabled={offset === 0}
        >
          <HiChevronLeft />
        </button>

        <input
          className="bg-[#E23B43] text-white p-2 rounded-lg m-2 max-w-[50px] text-center"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
        />

        <button
          onClick={() => setOffset(sLevelData?.total ? offset + 1 : offset)}
          className="bg-[#E23B43] text-white p-2 rounded-lg m-2 disabled:bg-[#092031]"
          disabled={offset === totalPages - 1}
        >
          <HiChevronRight />
        </button>
        <button
          onClick={() => setOffset(totalPages - 1)}
          className="bg-[#E23B43] text-white p-2 rounded-lg m-2 disabled:bg-[#092031]"
          disabled={offset === totalPages - 1}
        >
          <HiChevronDoubleRight />
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] mb-10 mx-5 pb-16">
        {
          // NO RESULTS
          sLevelData?.words.length === 0 && (
            <div className="mt-40">
              <h1 className="text-4xl font-bold text-center underline underline-offset-8">
                Out of range
              </h1>
            </div>
          )
        }

        {sLevelData?.words.map((word: Word) => (
          <div
            key={word.word}
            className="bg-[#092031] mx-4 my-2 px-4 py-3 rounded-lg hover:scale-105 cursor-pointer hover:shadow-[3px_3px_0px_0px_#E23B43]  duration-200 "
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
    </>
  );
};

export default SingleLevel;
