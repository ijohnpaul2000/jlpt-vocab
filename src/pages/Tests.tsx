import { addDoc, collection } from "firebase/firestore";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import database from "../data/db.json";
import db, { auth } from "../firebase";
import { Question, Word } from "../types/words.types";
type Props = {};

const Tests = (props: Props) => {
  const { level } = useParams();
  const navigate = useNavigate();

  const [allWordsByLevel, setAllWordsyLevel] = useState<Word[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState<Word>({} as Word);

  const [choices, setChoices] = useState<string[]>([]);
  const [correctChoice, setCorrectChoice] = useState<string>("");

  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [correctAnswersNumber, setCorrectAnswersNumber] = useState<number>(0);

  const [accuracy, setAccuracy] = useState<number>(0);

  useEffect(() => {
    const filterWords = (): void => {
      const _allWords: Word[] = database.words.filter(
        (word) => word.level.toString() === level
      );

      setAllWordsyLevel(_allWords as []);
    };
    filterWords();
  }, []);

  useEffect(() => {
    _generateQuestions();
  }, [allWordsByLevel]);

  useEffect(() => {
    let lastQuestionNumber: number =
      questionNumber === 1 ? questionNumber : questionNumber - 1;

    setAccuracy(
      Number(((correctAnswersNumber / lastQuestionNumber) * 100).toFixed(2))
    );
  }, [correctAnswersNumber, accuracy, questionNumber, choices]);

  function _generateQuestions(): void {
    const currentQuestion: Word =
      allWordsByLevel[Math.floor(Math.random() * allWordsByLevel.length)];

    const correctChoice = currentQuestion?.meaning;
    const randomChoices = generateThreeRandomChoices();

    const mergedChoices = [...randomChoices, correctChoice] as string[];

    const finalChoices = shuffleChoices(mergedChoices);

    setCurrentQuestion(currentQuestion);
    setChoices(finalChoices);
    setCorrectChoice(correctChoice);
  }

  function generateThreeRandomChoices(): string[] {
    const choices: string[] = [];
    for (let i = 0; i < 3; i++) {
      const randomChoice =
        allWordsByLevel[Math.floor(Math.random() * allWordsByLevel.length)];
      choices.push(randomChoice?.meaning);
    }
    return choices;
  }

  function shuffleChoices(choices: string[]): string[] {
    const shuffledChoices = choices.sort(() => Math.random() - 0.5);
    return shuffledChoices;
  }

  function handleAnswer(choice: string): void {
    if (correctChoice === choice) {
      alert("Correct!");
      setQuestionNumber((prevNumber) => prevNumber + 1);
      _generateQuestions();
      setCorrectAnswersNumber(
        (prevCorrectAnswersNumber) => prevCorrectAnswersNumber + 1
      );
    } else {
      alert("Wrong!");
      setQuestionNumber((prevNumber) => prevNumber + 1);
      _generateQuestions();
    }
  }

  function handleFinishTest(): void {
    if (questionNumber === 21) {
      alert("Test finished!");

      addDoc(collection(db, "tests"), {
        accuracy,
        createdAt: new Date(),
        date: new Date(),
        level: level,
        email: auth.currentUser?.email,
        previousTestScore: correctAnswersNumber,
      });

      navigate("/profile");
    }
  }

  useEffect(() => {
    handleFinishTest();
  }, [questionNumber]);

  return (
    <div className="bg-[#092031] mx-5 mt-10 mb-20 rounded-lg text-white">
      <div className="max-w-[1000px] mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">
          Question {questionNumber} out of 20
        </h1>
        <h1 className="text-xl font-bold">Level {level}</h1>

        <h1 className="text-2xl my-4 px-2">
          What is the meaning of{" "}
          <span className="text-[#E23B43] font-bold">
            {currentQuestion?.word}
          </span>{" "}
          ?
        </h1>
        <hr className="mx-10 md:mx-32 my-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[700px] mx-auto">
          {choices.map((choice) => (
            <div
              key={choice}
              onClick={() => handleAnswer(choice)}
              className="bg-[#E23B43] text-md rounded-lg p-3 mx-10 my-1 md:m-3 cursor-pointer flex items-center justify-center"
            >
              {choice}
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-10">
          <h1 className="text-xl font-bold">Accuracy: {accuracy}%</h1>
        </div>
      </div>
    </div>
  );
};

export default Tests;
