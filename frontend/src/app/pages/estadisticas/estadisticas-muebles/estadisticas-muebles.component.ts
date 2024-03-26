import { Component, OnInit } from '@angular/core';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
import { resultados_ordenados_elementos } from 'src/app/interfaces/resultados_ordenados';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { EstadisticasMethodsService } from 'src/app/shared/estadisticas/estadisticas-methods.service';

@Component({
  selector: 'app-estadisticas-muebles',
  templateUrl: './estadisticas-muebles.component.html',
  styleUrls: ['./estadisticas-muebles.component.css']
})
export class EstadisticasMueblesComponent implements OnInit  {
 constructor  ( private elementosService: ElementosService, private   estadisticasMethos: EstadisticasMethodsService ){ }

 estadisticas_resultados_carteles: datos_graficas[] = [];
 estadisticas_resultados_conteo: datos_graficas[] = [];
 ngOnInit(): void {  
  this.obtenerEstadisticas();
 }

 obtenerEstadisticas() {

  this.elementosService.getEstadisticasRespuestas().subscribe(
    (estadisticas: resultados_ordenados_elementos) => {
    });
 }

}
