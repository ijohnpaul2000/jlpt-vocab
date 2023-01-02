import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import database from "../data/db.json";
import { Word } from "../types/words.types";
type Props = {};

const Tests = (props: Props) => {
  const { level } = useParams();

  const [allWordsByLevel, setAllWordsyLevel] = useState<Word[]>([]);

  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  useEffect(() => {
    const filterWords = (): void => {
      const _allWords: Word[] = database.words.filter(
        (word) => word.level.toString() === level
      );

      setAllWordsyLevel(_allWords as []);
    };
    filterWords();
  }, []);

  console.log(allWordsByLevel);

  function generateQuestions() {
    const questions: any = [];

    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * allWordsByLevel.length);

      const choices = [];

      choices.push({
        a: allWordsByLevel[randomIndex]?.meaning,
      });

      questions.push({
        question: allWordsByLevel[randomIndex]?.word,
        choices: {
          a: allWordsByLevel[randomIndex]?.meaning,
          b: allWordsByLevel[randomIndex]?.meaning,
          c: allWordsByLevel[randomIndex]?.meaning,
          d: allWordsByLevel[randomIndex]?.meaning,
        },
      });
    }

    return {
      questions,
    };
  }

  const questionsAndAnswers = useMemo(
    () => generateQuestions(),
    [allWordsByLevel]
  );

  console.log(questionsAndAnswers);
  return <></>;
};

export default Tests;
