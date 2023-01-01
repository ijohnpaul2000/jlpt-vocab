export interface Word {
  word: string;
  furigana: string;
  level: number | string;
  meaning: string;
  romaji: string;
}

export interface SearchWordResponse {
  limit: number;
  offset: number;
  total: number;
  words: Word[];
}
