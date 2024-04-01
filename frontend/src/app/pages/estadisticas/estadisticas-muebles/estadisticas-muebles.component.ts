import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProcesadosDetallesComponent } from 'src/app/componentes/procesados-detalles/procesados-detalles.component';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
import { elementos } from 'src/app/interfaces/elementos';
import { estadisticas_carteles, estadisticas_conteo_dispositivos, resultados_ordenados, resultados_ordenados_elementos } from 'src/app/interfaces/resultados_ordenados';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { UrlService } from 'src/app/servicios/url/url.service';
import { EstadisticasMethodsService } from 'src/app/shared/estadisticas/estadisticas-methods.service';




@Component({
  selector: 'app-estadisticas-muebles',
  templateUrl: './estadisticas-muebles.component.html',
  styleUrls: ['./estadisticas-muebles.component.css']
})
export class EstadisticasMueblesComponent implements OnInit  {
 constructor  ( private elementosService: ElementosService, private   estadisticasMethods: EstadisticasMethodsService, private urlService: UrlService, public dialogService: DialogService ){ }

 ref: DynamicDialogRef | undefined;

 
 estadisticas: resultados_ordenados_elementos;
 estadisticas_resultados_carteles: datos_graficas[] = [];
 estadisticas_resultados_conteo: datos_graficas[] = [];

 estadisticasCartel: estadisticas_carteles[] = [];
 estadisticasConteo: estadisticas_conteo_dispositivos[] = [];

 tableStateOptions =  [{label: 'Carteles', value: 'cartel'}, {label: 'Conteo de dispositivos', value: 'dispositivo'}];
 tableStateValue = 'cartel';
 ngOnInit(): void {  
  this.obtenerEstadisticas();
 }

 obtenerEstadisticas() {

  this.elementosService.getEstadisticasRespuestas().subscribe(
    (estadisticas: resultados_ordenados_elementos) => {
      this.estadisticas = estadisticas;  //tengo los elementos, pero no se que uso darles

      const estadisticas_length: resultados_ordenados = this.estadisticasMethods.fromOrdenadosElementosToOrdenados(estadisticas);
      this.estadisticas_resultados_carteles = this.estadisticasMethods.mapearEstadisticasResultados(estadisticas_length, "carteles", false);
      this.estadisticas_resultados_conteo = this.estadisticasMethods.mapearEstadisticasResultados(estadisticas_length, "conteoDispositivos", false);
      
      this.initCarteles();
      this.initConteoDispositivos();


    });
 }

 initCarteles() {
  this.elementosService.getEstadisticasCarteles().subscribe(
    (carteles: estadisticas_carteles[]) => {
      this.estadisticasCartel = carteles;
    } 
  );
 }

 initConteoDispositivos(){
  this.elementosService.getEstadisticasConteoDispositivos().subscribe(
    (conteo: estadisticas_conteo_dispositivos[]) => {
      this.estadisticasConteo = conteo;
    } 
  );
 }


 getTotalCarteles(cartel: estadisticas_carteles) {
    return cartel.alta + cartel.muy_alta + cartel.media + cartel.baja + cartel.muy_baja + cartel.ninguna + cartel.otro_idioma;
 }

 

 getTotalDispositivos(conteo: estadisticas_conteo_dispositivos) {
  return conteo.error + conteo.diferencia.reduce((a, b) => a + b, 0);
 }
 get5Plus(conteo: estadisticas_conteo_dispositivos) {
  //obtener la longitud del subarray a partir del indice 5
    return conteo.diferencia.slice(5).reduce((a, b) => a + b, 0);
 }

 getImagenElementoUri(elemento: elementos) {
  return this.urlService.url_imagenes_referencia + elemento.imagenes.url;
 }

 openInfo(elemento: elementos) {
  const categoria: "carteles" | "conteoDispositivos" = elemento.categorias_elementos.id === 1 ? "carteles" : "conteoDispositivos";
  const id_elemento:number = elemento.id

  this.elementosService.getElementoWithProcesadosById(id_elemento).subscribe((elementoConProcesados: elementos) => {

    
    this.elementosService.getEstadisticasRespuestasById(id_elemento).subscribe((resutlados: resultados_ordenados) => {
      const datos:datos_graficas[] = this.estadisticasMethods.mapearEstadisticasResultados(resutlados, categoria, true);


      this.ref = this.dialogService.open(ProcesadosDetallesComponent, {
         header: `Proesado del elemento ${elemento.nombre}`,
        width: '70%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000,
        data: {
          elemento: elementoConProcesados,
          datos_graficas: datos
        }
    
      });

    });

   
  });
 
 }


}
