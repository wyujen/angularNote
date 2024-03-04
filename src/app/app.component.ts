import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WspChartComponent } from './wsp-chart/wsp-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WspChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  
}


