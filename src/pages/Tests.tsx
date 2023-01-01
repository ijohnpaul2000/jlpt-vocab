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

  return <></>;
};

export default Tests;
