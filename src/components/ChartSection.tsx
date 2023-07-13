import { HouseholdData } from '@/lib/utilsType';
import { Typography, Grid } from '@mui/material';
import ColumnChart from '@/components/ColumnChart';
import PieChart from '@/components/PieChart';

type Props = {
  year: string;
  county: string;
  district: string;
  householdData: HouseholdData | null
}

export default function ChartSection({
  year,
  county,
  district,
  householdData
}: Props) {
  return (
    <>
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontSize: {
            xs: '25px',
            sm: '32px',
          },
          fontWeight: 'medium',
          marginTop: {
            xs: '26px',
            sm: '42px',
          },
        }}
      >{`${year}年 ${county} ${district}`}</Typography>
      <Grid sx={{
        marginTop: {
          xs: '32px',
          sm: '48px',
        },
      }}>
        <ColumnChart householdData={householdData} />
        <PieChart householdData={householdData} />
      </Grid>
    </>
  );
}