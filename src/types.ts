export type User = {
  username: string;
  hastag: string;
  compTime: string;
  ranks: Rank[];
  games: Game[];
  topThree: Hero[];
};

type Rank = {
  src: string;
  role: string;
  sr: string;
};

type Game = {
  info: string;
  value: string;
};

type Hero = {
  src: string;
  name: string;
  timePlayed: string;
  games: Game[];
};
