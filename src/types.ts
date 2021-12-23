export type Rank = {
  src?: string;
  role?: string;
  sr?: string;
};

export type InfoField = {
  name: string;
  value: string;
};

export type Hero = {
  id: string;
  src?: string;
  name?: string;
  info?: InfoField[];
};

export type User = {
  username: string;
  hashtag: string;
  ranks: Rank[];
  info: InfoField[];
  heroes: Hero[];
};

