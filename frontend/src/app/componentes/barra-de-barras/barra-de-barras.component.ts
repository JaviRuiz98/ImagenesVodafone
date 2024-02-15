import { Component, OnInit, Input } from '@angular/core';
import { Barra } from '../barra-de-barras/barra';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-de-barras',
  templateUrl: './barra-de-barras.component.html',
  styleUrls: ['./barra-de-barras.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ],
})
export class BarraDeBarrasComponent implements OnInit {
  @Input() datos_barras: number[] = []; // Espera un arreglo de valores numéricos

  bars: Barra[] = [];

  ngOnInit(): void {
    this.bars = this.datos_barras.map(value => ({
      value,
      color: this.getColorByValue(value),
      width: 100 / this.datos_barras.length // Asume que todas las barras deben tener el mismo ancho
    }));
  }

  getColorByValue(value: number): string {
    if(value == 0) return 'rgba(0, 0, 0, 0)';
    else if(value <= 1) return 'rgba(0, 128, 0, 0.5)';
    else if(value <= 2) return 'rgba(255, 165, 0, 0.5)';
    else if(value <= 3) return 'rgba(255, 0, 0, 0.5)';
    else return 'rgba(0, 0, 255, 0.5)';
  }
}
