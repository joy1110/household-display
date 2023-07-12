import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { HouseholdData } from '../lib/utilsType';

export default function ColumnChart({ householdData }: { householdData: HouseholdData | null }) {
  if (!householdData) return <></>;

  const { household_ordinary_m, household_single_m, household_ordinary_f, household_single_f } = householdData;

  const options: Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '人口數統計',
      verticalAlign: 'top',
      margin: 30,
    },
    xAxis: {
      categories: ['共同生活', '獨立生活'],
      tickWidth: 0,
      title: {
        text: '型態',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333'
        },
      },
    },
    yAxis: {
      title: {
        text: '數量',
        align: 'high',
        y: -20,
        x: -10,
        offset: 0,
        rotation: 0,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333'
        },
      }
    },
    tooltip: {
      formatter() {
        return `${this.key} ${this.series.name}: ${this.y?.toLocaleString()}`;
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          formatter() {
            return `${this.y?.toLocaleString()}`;
          }
        }
      }
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: '男性',
        data: [household_ordinary_m, household_single_m],
        type: 'column',
        color: '#7D5FB2'
      },
      {
        name: '女性',
        data: [household_ordinary_f, household_single_f],
        type: 'column',
        color: '#C29FFF'
      },
    ],
  };

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
    />
  );
}