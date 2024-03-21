import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-super-pie',
  templateUrl: './super-pie.component.html',
  styleUrls: ['./super-pie.component.css'],
  standalone: true,
  imports: [
    ChartModule
  ],
})
export class SuperPieComponent {

}
