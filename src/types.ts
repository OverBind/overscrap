export type User = {
  username: string;
  hashtag: string;
  ranks: Rank[];
  info: Info[];
  topThree: Hero[];
};

export type Rank = {
  src?: string;
  role?: string;
  sr?: string;
};

export type Info = {
  detail: string;
  value: string;
};

export type Hero = {
  src?: string;
  name?: string;
  timePlayed?: string;
  info?: Info[];
};
