import { Component, OnInit } from '@angular/core';
import { resultados_ordenados_elementos } from 'src/app/interfaces/resultados_ordenados';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';

@Component({
  selector: 'app-estadisticas-muebles',
  templateUrl: './estadisticas-muebles.component.html',
  styleUrls: ['./estadisticas-muebles.component.css']
})
export class EstadisticasMueblesComponent implements OnInit  {
 constructor  ( private elementosService: ElementosService ){ }

 estadisticas: resultados_ordenados_elementos;
 ngOnInit(): void {  
  this.obtenerEstadisticas();
 }

 obtenerEstadisticas() {
  this.elementosService.getEstadisticasRespuestas().subscribe(
    (estadisticas: resultados_ordenados_elementos) => {
      this.estadisticas = estadisticas;
    });
 }

}
