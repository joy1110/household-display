export type HouseholdData = {
  [key: string]: number;
};

export type HouseholdRawData = {
  [key: string]: string;
};

export type TownType = {
  districts: { name: string }[]
  name: string;
};
