import { useState } from 'react';
import { useRouter } from 'next/router';
import { TownType } from '@/lib/utilsType';
import { TextField, Autocomplete, Button, Grid } from '@mui/material';

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

  const autoCompleteCustomStyle = {
    '&.MuiAutocomplete-root.Mui-focused': {
      '.MuiInputLabel-root': {
        color: '#651FFF',
      },
      fieldset: {
        borderColor: '#651FFF',
      }
    }
  };

  return (
    <Grid
      sx={{
        padding: {
          xs: '8px',
          sm: '8px 0 0 0',
        },
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: {
          xs: '16px',
          sm: '12px',
        },
      }}
    >
      <Autocomplete
        options={yearList}
        renderInput={(params) => <TextField {...params} label="年份" />}
        value={selectedYear}
        onChange={handleYearChange}
        size='small'
        sx={{
          fontSize: '16px',
          width: '110px',
          ...autoCompleteCustomStyle,
        }}
      />
      <Autocomplete
        options={countyList}
        renderInput={(params) => <TextField {...params} label="縣/市" />}
        value={selectedCounty}
        onChange={handleCountyChange}
        size='small'
        sx={{
          fontSize: '16px',
          width: {
            xs: '100%',
            sm: '167px',
          },
          ...autoCompleteCustomStyle,
        }}
      />
      <Autocomplete
        options={districtList || []}
        renderInput={(params) => <TextField {...params} label="區" />}
        value={selectedDistrict}
        onChange={handleDistrictChange}
        size='small'
        sx={{
          fontSize: '16px',
          width: {
            xs: '100%',
            sm: '167px',
          },
          ...autoCompleteCustomStyle,
        }}
      />
      <Button
        variant="contained"
        disabled={!selectedYear || !selectedCounty || !selectedDistrict}
        onClick={handleButtonSubmit}
        sx={{
          width: {
            xs: '100%',
            sm: '83px',
          },
          height: '36px',
          '&.MuiButton-root': {
            backgroundColor: '#651FFF ',
            '&:disabled': {
              backgroundColor: 'rgba(0, 0, 0, .12)',
            },
          }
        }}
      >
        SUBMIT
      </Button>
    </Grid>
  );
}
