import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import townList from '@/data/townList.json';
import { HouseholdData, TownType } from '@/lib/utilsType';
import validateDistrict from '@/lib/validateDistrict';
import summingHouseholdData from '@/lib/summingHouseholdData';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Header from '@/components/Header';
import HouseholdInputs from '@/components/HouseholdInputs';
import CustomDivider from '@/components/CustomDivider';
import ChartSection from '@/components/ChartSection';
import Loading from '@/components/Loading';

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
  const { household = [] } = params;
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const endLoading = () => setIsLoading(false);
    const startLoading = () => setIsLoading(true);

    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', endLoading);

    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', endLoading);
    };
  }, []);

  const renderContent = () => {
    if (Object.keys(router.query).length === 0) return <></>;

    if (!isDistrictValid) {
      return (<Typography
        variant="h1"
        align="center"
        sx={{
          fontSize: {
            xs: '25px',
            sm: '32px',
          },
          fontWeight: 'medium',
          marginTop: {
            xs: '34px',
            sm: '42px',
          },
        }}
      >
        無效的縣市/行政區
      </Typography>);
    }

    if (isLoading) {
      return <Loading />;
    }

    return (
      <ChartSection
        year={year}
        county={county}
        district={district}
        householdData={householdData}
      />
    );
  }

  return (
    <>
      <Header />
      <main className='relative pt-12 z-0'>
        <Image
          className='absolute top-[56px] left-0 w-[149px] h-[971px] -z-10 opacity-20 sm:opacity-100'
          src="/images/bg-text-taiwan.png"
          alt=""
          width={149}
          height={971}
        />
        <Grid
          sx={{
            padding: {
              xs: '24px 8px 0',
              sm: '24px 0 0',
            },
            width: {
              xs: 'auto',
              sm: '69.72%'
            },
            marginLeft: {
              xs: 0,
              sm: '20.31%',
            },
          }}
        >
          <Typography
            variant="h1"
            align="center"
            sx={{
              fontSize: {
                xs: '25px',
                sm: '32px',
              },
              fontWeight: 'medium',
            }}
          >人口數、戶數按戶別及性別統計</Typography>
          <Grid
            sx={{
              marginTop: {
                xs: '32px',
                sm: '48px',
              },
            }}
          >
            <HouseholdInputs
              townList={townListData}
              year={year}
              county={county}
              district={district}
            />
          </Grid>
          <Grid
            sx={{
              marginTop: {
                xs: '34px',
                sm: '42px',
              },
            }}
          >
            <CustomDivider />
          </Grid>
          {renderContent()}
        </Grid>
      </main>
    </>
  );
}
