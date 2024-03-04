import { Component, OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { LineChartComponent } from '../chart/line-chart.component';

export interface ISCurveChartConfig{
  lineLabels: string[]
  datasets: ChartDataset[]
  dateLineDisplay: boolean
  chartWidth:number
}
export type ISCurveChartMap = Record<string, ISCurveChartConfig>;

@Component({
  selector: 'app-wsp-chart',
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './wsp-chart.component.html',
  styleUrl: './wsp-chart.component.css'
})

export class WspChartComponent implements OnInit {
  CHART_COLORS = {
    blue: 'rgb(54, 162, 235)',
    red: 'rgb(255, 99, 132)',
  };
  widthPerDataPoint = 42
  baseElementWidth = 250

  today = this.getToday();
  sCurveChartMap : ISCurveChartMap = {}

  ngOnInit(): void {
    this.buildFakeData()
  }

  buildFakeData(): void {
    const fakeMonthsLabels: string[] = [
      '2023-01',
      '2023-02',
      '2023-03',
      '2023-04',
      '2023-05',
      '2023-06',
      '2023-07',
      '2023-08',
      '2023-09',
      '2023-10',
      '2023-11',
      '2023-12',
      '2024-01',
      '2024-02',
      '2024-03',
      '2024-04',
      '2024-05',
      '2024-06',
      '2024-07',
      '2024-08',
      '2024-09',
      '2024-10',
      '2024-11',
      '2024-12',
    ];
    const fakeEstimatedAchievementRateList: number[] = [
      0.0,
      0.043,
      0.089,
      0.091,
      0.157,
      0.203,
      0.249,
      0.256,
      0.312,
      0.378,
      0.389,
      0.445,
      0.501,
      0.558,
      0.564,
      0.62,
      0.676,
      0.732,
      0.788,
      0.844,
      0.9,
      0.956,
      0.962,
      1.0,
    ];
    const fakeActualAchievementRateList: number[] = [
      0.025,
      0.041,
      0.16,
      0.172,
      0.198,
      0.32,
      0.34,
      0.415,
      0.45,
      0.465,
      0.5,
      0.55,
      0.6,
      0.65,
      0.7,
    ];

    const fakeSCurveConfig = this.buildSCurveChartConfig(fakeMonthsLabels,fakeEstimatedAchievementRateList, fakeActualAchievementRateList) 
    this.updateSCurveChartMap('fake', fakeSCurveConfig)
    
  }

  buildSCurveChartConfig (lineLabels:string[],estimatedRateList:number[], actualRateList:number[]): ISCurveChartConfig {
    const colors = Object.values(this.CHART_COLORS);
    const today = this.today
    const index = this.getTodayInRangeIndex(lineLabels, this.today);
    let dateLineDisplay = false

    if (index !== -1) {
      estimatedRateList.splice(index + 1, 0, estimatedRateList[index]);
      actualRateList.splice(index + 1, 0, actualRateList[index]);
      lineLabels.splice(index + 1, 0, today);
      dateLineDisplay = true
    }
    const chartWidth = lineLabels.length*this.widthPerDataPoint+this.baseElementWidth
    const datasets :ChartDataset[] = [
      {
        label: '預計完成',
        borderColor: colors[0],
        backgroundColor: colors[0],
        data: estimatedRateList,
        borderDash: [5, 5],
      },
      {
        label: '實際完成',
        borderColor: colors[1],
        backgroundColor: colors[1],
        data: actualRateList
      },
    ];
    return{
      lineLabels: lineLabels,
      datasets: datasets,
      dateLineDisplay: dateLineDisplay,
      chartWidth:chartWidth
    }
  }

  updateSCurveChartMap(name:string, sCurveConfig:ISCurveChartConfig):void{
    this.sCurveChartMap[name] = sCurveConfig
  }
  getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  getTodayInRangeIndex(timeArray: string[], today: string): number {
    const currentYearMonth = today.slice(0, 7);
    const index = timeArray.findIndex(time => time === currentYearMonth);
    return index;
  }

}
