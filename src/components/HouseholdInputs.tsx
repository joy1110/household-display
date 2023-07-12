import { useState } from 'react';
import { useRouter } from 'next/router';
import { TownType } from '@/lib/utilsType';
import { TextField, Autocomplete, Button } from '@mui/material';

type Props = {
  townList: TownType[];
  year: string;
  county: string;
  district: string;
};

export default function HouseholdInputs({
  townList,
  year,
  county,
  district,
}: Props) {
  const [selectedYear, setSelectedYear] = useState<string | null>(year || null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(county || null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(district || null);
  const router = useRouter();
  const minYear = 106;
  const maxYear = new Date().getFullYear() - 1 - 1911;
  const yearList = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => (i + minYear).toString(),
  );
  const countyList = townList.map((townData: TownType) => townData.name);
  const districtList = townList
    .filter((cur) => cur.name === selectedCounty)[0]?.districts
    ?.map((districts) => districts.name);

  const handleYearChange = (e: React.SyntheticEvent, newVal: string | null): void => {
    setSelectedYear(newVal);
  };

  const handleCountyChange = (e: React.SyntheticEvent, newVal: string | null): void => {
    setSelectedCounty(newVal);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (e: React.SyntheticEvent, newVal: string | null): void => {
    setSelectedDistrict(newVal);
  };

  const handleButtonSubmit = (): void => {
    router.push(`/${selectedYear}/${selectedCounty}/${selectedDistrict}`);
  };

  return (
    <>
      <Autocomplete
        options={yearList}
        renderInput={(params) => <TextField {...params} label="年份" />}
        value={selectedYear}
        onChange={handleYearChange}
      />
      <Autocomplete
        options={countyList}
        renderInput={(params) => <TextField {...params} label="縣/市" />}
        value={selectedCounty}
        onChange={handleCountyChange}
      />
      <Autocomplete
        options={districtList || []}
        renderInput={(params) => <TextField {...params} label="區" />}
        value={selectedDistrict}
        onChange={handleDistrictChange}
      />
      <Button
        variant="contained"
        disabled={!selectedYear || !selectedCounty || !selectedDistrict}
        onClick={handleButtonSubmit}
      >
        SUBMIT
      </Button>
    </>
  );
}
