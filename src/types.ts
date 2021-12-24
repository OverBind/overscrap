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
