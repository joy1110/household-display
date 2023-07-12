import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import townList from '@/data/townList.json';
import { HouseholdData, TownType } from '@/lib/utilsType';
import validateDistrict from '@/lib/validateDistrict';
import summingHouseholdData from '@/lib/summingHouseholdData';
import HouseholdInputs from '@/components/HouseholdInputs';
import ColumnChart from '@/components/ColumnChart';
import PieChart from '@/components/PieChart';

type Props = {
  townList: TownType[];
  year: string;
  county: string;
  district: string;
  isDistrictValid: boolean;
  householdData: HouseholdData | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params = {},
}) => {
  const { household } = params;
  const [year = '', county = '', district = ''] = household as string[];
  const isDistrictValid = validateDistrict(county, district);
  let householdData = null;

  if (isDistrictValid && year && county && district) {
    const { data } = await axios.get(`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}?COUNTY=${county}&TOWN=${district}`);

    if (data?.responseData instanceof Array) {
      householdData = summingHouseholdData(data.responseData);
    }
  }

  return {
    props: {
      townList,
      year,
      county,
      district,
      isDistrictValid,
      householdData,
    },
  };
};

export default function Household({
  townList: townListData,
  year,
  county,
  district,
  isDistrictValid,
  householdData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!isDistrictValid) {
    return (
      <div>
        無效的縣市/行政區
      </div>
    );
  }

  return (
    <>
      <HouseholdInputs
        townList={townListData}
        year={year}
        county={county}
        district={district}
      />
      <ColumnChart householdData={householdData} />
      <PieChart householdData={householdData} />
    </>
  );
}
