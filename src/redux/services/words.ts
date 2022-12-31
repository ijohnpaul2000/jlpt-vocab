import { SearchWordResponse, Word } from "../../types/words.types";
import { api } from "../api";

export const extendedWordSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getStartingPageWords: builder.query<Word, void>({
      query: () => "api/words",
    }),
    getSearchedWords: builder.query<SearchWordResponse | any, string>({
      query: (word) => `api/words?word=${word}`,
    }),
    getWordsByLevel: builder.query<SearchWordResponse, number>({
      query: (level) => `api/words?level=${level}`,
    }),
    getWordsByOffsetLimitLevel: builder.query<
      SearchWordResponse | any,
      unknown
    >({
      query: ({ offset, limit, level }): string =>
        `api/words?offset=${offset}&limit=${limit}&level=${level}`,
    }),
    getRandomWord: builder.query<Word, void>({
      query: () => "api/words/random",
    }),
  }),
});

export const {
  useGetStartingPageWordsQuery,
  useGetSearchedWordsQuery,
  useGetWordsByLevelQuery,
  useGetWordsByOffsetLimitLevelQuery,
  useGetRandomWordQuery,
} = extendedWordSlice;
