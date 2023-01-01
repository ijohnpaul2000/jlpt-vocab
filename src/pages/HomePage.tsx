import Header from "../components/Header";
import {
  useGetRandomWordQuery,
  useGetSearchedWordsQuery,
} from "../redux/services/words";
import brushmark from "../assets/brushmark.png";
import { BsTriangleFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import Loading from "../components/Loading";
import Error from "../components/Error";
import React, { useEffect, useState } from "react";
import WordNotFound from "../components/WordNotFound";
import { SearchWordResponse, Word } from "../types/words.types";
import Levels from "./Levels";
import { Link as LinkS } from "react-scroll";

const HomePage = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [transformedWord, setTransformedWord] = useState<
    Word | undefined | null
  >(undefined);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    data: searchedWord,
    isError: isErrorSearchedWord,
    isFetching: isFetchingSearchedWord,
    isLoading: isLoadingSearchedWord,
  } = useGetSearchedWordsQuery(searchInput, {
    skip: !isSearching,
  });

  const {
    data: randomWord,
    isError: isErrorRandomWord,
    isFetching: isFetchingRandomWord,
    isLoading: isLoadingRandomWord,
  } = useGetRandomWordQuery();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSearching(true);
  }

  useEffect(() => {
    if (searchedWord?.words?.length > 0) {
      setTransformedWord(returnFirstResult(searchedWord));
    } else if (searchedWord?.words?.length === 0) {
      setTransformedWord(null);
      setIsOpen(true);
    }
  }, [searchedWord]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function returnFirstResult(word: SearchWordResponse) {
    const { words } = word;

    const firstResult = {
      word: words[0].word,
      furigana: words[0].furigana,
      romaji: words[0].romaji,
      meaning: words[0].meaning,
      level: words[0].level,
    };

    return firstResult;
  }

  return (
    <div className="mb-16">
      {(isFetchingSearchedWord ||
        isFetchingRandomWord ||
        isLoadingRandomWord ||
        isLoadingSearchedWord) && <Loading />}
      {(isErrorRandomWord || isErrorSearchedWord) && <Error />}
      {transformedWord === null && isOpen && (
        <WordNotFound
          searchedWord={searchInput}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <form onSubmit={handleSearch} className="flex justify-end mt-10 mr-5">
        <input
          value={searchInput}
          type="text"
          className={`bg-transparent border-b-[2px] border-[#E23B43] mr-4 text-right font-md
          
          `}
          onFocus={() => {
            setIsSearching(false);
          }}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button>
          <FiSearch
            size={25}
            color={"#E23B43"}
            className="self-end hover:scale-110 cursor-pointer duration-150"
          />
        </button>
      </form>
      <div className="px-5 text-center ">
        <h1 className="font-bold text-[#E23B43] text-6xl my-4">
          {transformedWord?.word ?? randomWord?.word}
          <img src={brushmark} alt="" className="max-w-[100px] mx-auto" />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-[auto,auto] bg-[#092031] rounded-lg py-5 px-3 max-w-[700px] mx-auto">
          <p className="font-bold text-[#E23B43] text-2xl py-2">Furigana: </p>
          <p className="font-bold text-white text-2xl py-2">
            {transformedWord?.furigana ?? randomWord?.furigana}
          </p>

          <p className="font-bold text-[#E23B43] text-2xl py-2">Romaji: </p>
          <p className="font-bold text-white text-2xl py-2">
            {transformedWord?.romaji ?? randomWord?.romaji}
          </p>

          <p className="font-bold text-[#E23B43] text-2xl py-2">Meaning: </p>
          <p className="font-bold text-white text-lg py-2">
            {transformedWord?.meaning ?? randomWord?.meaning}
          </p>

          <p className="font-bold text-[#E23B43] text-2xl py-2">Level: </p>
          <p className="font-bold text-white text-2xl py-2">
            {transformedWord?.level ?? randomWord?.level}
          </p>
        </div>

        <div className="my-4">
          <p>
            Test your{" "}
            <span
              className="text-[#E23B43] font-bold text-lg hover:cursor-pointer relative 
              before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#E23B43]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300 "
            >
              Japanese
            </span>{" "}
            skills, discover your language proficiency!
          </p>
          <div className="animate-bounce">
            <LinkS to="level" smooth={true} duration={200} spy={true}>
              <BsTriangleFill
                size={25}
                color={"red"}
                className="mx-auto my-4 rotate-180 cursor-pointer mt-16"
              />
            </LinkS>
          </div>
          <p>See more.</p>
        </div>
      </div>
      <Levels />
    </div>
  );
};

export default HomePage;
