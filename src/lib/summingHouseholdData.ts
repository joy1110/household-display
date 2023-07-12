import { HouseholdData, HouseholdRawData } from './utilsType';

const keys = [
  'household_single_m',
  'household_single_f',
  'household_ordinary_m',
  'household_ordinary_f',
];

export default function summingHouseholdData(data: HouseholdRawData[]): HouseholdData {
  return data.reduce((acc, cur) => {
    keys.forEach((key) => {
      const value = parseInt(cur[key], 10);
      acc[key] += Number.isNaN(value) ? 0 : value;
    });
    return acc;
  }, Object.fromEntries(keys.map((key) => [key, 0])) as HouseholdData);
}
