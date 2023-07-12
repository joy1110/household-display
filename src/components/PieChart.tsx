import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { HouseholdData } from '../lib/utilsType';

export default function PieChart({ householdData }: { householdData: HouseholdData | null }) {
  if (!householdData) return <></>;

  const { household_ordinary_m, household_single_m, household_ordinary_f, household_single_f } = householdData;

  const options: Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '戶數統計',
      verticalAlign: 'top',
      margin: 30,
    },
    tooltip: {
      formatter() {
        return `${this.key} ${this.y?.toLocaleString()}`;
      },
    },
    plotOptions: {
      pie: {
        showInLegend: true,
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f} %',
        },
        colors: ['#626EB2', '#A3B1FF'],
      },
    },
    credits: {
      enabled: false,
    },
    series: [{
      name: '戶數統計',
      type: 'pie',
      data: [
        {
          name: '共同生活',
          y: household_ordinary_m + household_ordinary_f,
        },
        {
          name: '獨立生活',
          y: household_single_m + household_single_f,
        },
      ],
    },],
  };

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
    />
  );
}