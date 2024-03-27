import { Component, OnInit } from '@angular/core';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
import { resultados_ordenados, resultados_ordenados_elementos } from 'src/app/interfaces/resultados_ordenados';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { EstadisticasMethodsService } from 'src/app/shared/estadisticas/estadisticas-methods.service';

@Component({
  selector: 'app-estadisticas-muebles',
  templateUrl: './estadisticas-muebles.component.html',
  styleUrls: ['./estadisticas-muebles.component.css']
})
export class EstadisticasMueblesComponent implements OnInit  {
 constructor  ( private elementosService: ElementosService, private   estadisticasMethods: EstadisticasMethodsService ){ }

 estadisticas: resultados_ordenados_elementos;
 estadisticas_resultados_carteles: datos_graficas[] = [];
 estadisticas_resultados_conteo: datos_graficas[] = [];
 ngOnInit(): void {  
  this.obtenerEstadisticas();
 }

 obtenerEstadisticas() {

  this.elementosService.getEstadisticasRespuestas().subscribe(
    (estadisticas: resultados_ordenados_elementos) => {
      this.estadisticas = estadisticas;
      console.log(this.estadisticas);
      const estadisticas_length: resultados_ordenados = this.estadisticasMethods.fromOrdenadosElementosToOrdenados(estadisticas);
      console.log(estadisticas_length);
      this.estadisticas_resultados_carteles = this.estadisticasMethods.mapearEstadisticasResultados(estadisticas_length, "carteles", false);
      this.estadisticas_resultados_carteles = this.estadisticasMethods.mapearEstadisticasResultados(estadisticas_length, "conteoDispositivos", false);
      console.log ('estadisticas_resultados_carteles', this.estadisticas_resultados_carteles);
      console.log ('estadisticas_resultados_conteo', this.estadisticas_resultados_conteo);

    });
 }

}
