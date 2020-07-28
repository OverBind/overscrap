export type User = {
  username: string;
  hashtag: string;
  compTime: string[];
  ranks: Rank[];
  games: Game[];
  topThree: Hero[];
};

export type Rank = {
  src?: string;
  role?: string;
  sr?: string;
};

export type Game = {
  info: string;
  value: string;
};

export type Hero = {
  src?: string;
  name?: string;
  timePlayed?: string;
  games?: Game[];
};
