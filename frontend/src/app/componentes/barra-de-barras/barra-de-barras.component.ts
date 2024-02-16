import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
export class BarraDeBarrasComponent implements OnChanges {
  @Input() datos_barras: number[] = []; // Espera un arreglo de valores numéricos

  bars: Barra[] = [];

  ngOnChanges(): void {
    this.bars = this.datos_barras.map(value => ({
      value,
      color: this.getColorByValue(value),
      width: 100 / this.datos_barras.length // Asume que todas las barras deben tener el mismo ancho
    }));

    console.log(this.bars);
  }

  getColorByValue(value: number): string {
    if(value == 0) return 'rgba(0, 0, 0, 0)'; // Transparente
    else if(value == 1) return 'rgba(152, 251, 152, 0.5)'; // Verde claro
    else if(value == 2) return 'rgba(255, 255, 224, 0.5)'; // Amarillo claro
    else if(value == 3) return 'rgba(255, 165, 0, 0.5)'; // Naranja claro
    else return 'rgba(255, 99, 71, 0.6)'; // Rojo claro

  }
}
