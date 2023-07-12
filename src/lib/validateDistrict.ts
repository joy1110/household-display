import townList from '@/data/townList.json';
import { TownType } from './utilsType';

export default function validateDistrict(county: string, district: string): boolean {
  const selectedCount: TownType | undefined = townList.find((item) => item.name === county);

  if (selectedCount) {
    return selectedCount.districts.some((item) => item.name === district);
  }

  return false;
}
