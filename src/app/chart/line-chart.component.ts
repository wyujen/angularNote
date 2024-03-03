import { Component, ElementRef, ViewChild, AfterViewInit, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartDataset, ChartOptions, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-moment';
@Component({
  selector: 'jhi-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  standalone:true,
  
})
export class LineChartComponent implements AfterViewInit, OnInit {
  @Input() width = 1200;
  @Input() height = 400;
  @Input() title: string[] = [];
  @Input() subtitle = '';
  @Input() lineLabels: string[] = [];
  @Input() datasets: ChartDataset[] = [];
  @Input() dateLineDisplay = false;
  @Input() dateValue = '';

  @ViewChild('chartEl') chartEl!: ElementRef<HTMLCanvasElement>;

  readonly lineOption: ChartOptions = {
    maintainAspectRatio: false, // 保持圖表的寬高比
    responsive: false,
    scales: {
      y: {
        title: {
          display: true,
          text: '完成百分比',
        },
        beginAtZero: true,
        ticks: {
          format: {
            style: 'percent',
            minimumFractionDigits: 0,
          },
        },
      },
      x: {
        type: 'time',
        time: {
          unit: 'month',
          tooltipFormat: 'YYYY-MM',
          displayFormats: {
            month: 'YYYY-M',
          },
        },
        title: {
          display: true,
          text: '日期',
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          source: 'data',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: '',
        align: 'center',
        padding: {
          top: 5,
          bottom: 10,
        },
        font: {
          size: 18,
        },
      },
      subtitle: {
        display: true,
        text: '',
        align: 'start',
        padding: {
          top: 5,
          bottom: 10,
        },
        font: {
          size: 14,
        },
      },
      legend: {
        // display: true,
        position: 'right',
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          title: () => '',
        },
      },
      annotation: {
        annotations: {
          dateLine: {
            display: true,
            type: 'line',
            yMin: 0,
            yMax: 1,
            borderColor: 'rgb(0,0,0)',
            borderWidth: 2,
            xMin: undefined,
            xMax: undefined,
          },
        },
      },
    },
  };
  private lineChart!: Chart | undefined;

  ngOnInit(): void {
    Chart.register(...registerables, annotationPlugin);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChartData(this.lineLabels, this.datasets);
  }

  ngAfterViewInit(): void {
    this.setLineChart();
    this.buildOptions();
  }

  setLineChart(): void {
    const config: ChartConfiguration = {
      type: 'line',
      data: this.buildData(),
      options: this.buildOptions(),
    };
    this.lineChart = new Chart(this.chartEl.nativeElement, config);
  }

  buildData(): ChartData {
    const data = {
      labels: this.lineLabels,
      skipNull: true,
      datasets: this.datasets,
    };
    console.log(data)

    return data;

  }
  buildOptions(): ChartOptions {
    const options: any = { ...this.lineOption };
    // 當日線
    if (options.plugins?.annotation?.annotations.dateLine && this.dateLineDisplay === true) {
      options.plugins.annotation.annotations.dateLine.display = this.dateLineDisplay;
      options.plugins.annotation.annotations.dateLine.xMax = this.dateValue;
      options.plugins.annotation.annotations.dateLine.xMin = this.dateValue;
    }
    // if (options.plugins?.annotation?.annotations.dateLine) {
    //   options.plugins.annotation.annotations.dateLine.xMax = '2024-02-15';
    //   options.plugins.annotation.annotations.dateLine.xMin = '2024-02-15';
    // }
    options.plugins.title.text = this.title;
    options.plugins.subtitle.text = this.subtitle;

    return options;
  }

  updateChartData(lineLabels: string[], datasets: ChartDataset[]): void {
    if (this.lineChart) {
      this.lineChart.data.labels = lineLabels;
      this.lineChart.data.datasets = datasets;
      this.lineChart.options = this.buildOptions();
      this.lineChart.update();
    }
  }
}

