import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, combineLatest } from 'rxjs';
import { ProcesadosDetallesComponent } from 'src/app/componentes/procesados-detalles/procesados-detalles.component';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
import { elementos } from 'src/app/interfaces/elementos';
import { estadisticas_carteles, estadisticas_conteo_dispositivos, resultados_ordenados, resultados_ordenados_elementos } from 'src/app/interfaces/resultados_ordenados';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { UrlService } from 'src/app/servicios/url/url.service';
import { EstadisticasMethodsService } from 'src/app/shared/estadisticas/estadisticas-methods.service';
import { FiltroState } from 'src/app/state/estadisticas/elementoSeleccionados.state';




@Component({
  selector: 'app-estadisticas-muebles',
  templateUrl: './estadisticas-muebles.component.html',
  styleUrls: ['./estadisticas-muebles.component.css']
})
export class EstadisticasMueblesComponent implements OnInit  {

 constructor  ( private filtroState: FiltroState,
    private elementosService: ElementosService,
    private   estadisticasMethods: EstadisticasMethodsService,
    private urlService: UrlService, 
    public dialogService: DialogService,
    private state: FiltroState){
      this.setStateSelectors();
  } 

 
  
 ref: DynamicDialogRef | undefined;

 
 estadisticas: resultados_ordenados_elementos;
 estadisticas_resultados_carteles: datos_graficas[] = [];
 estadisticas_resultados_conteo: datos_graficas[] = [];

 estadisticasCartel: estadisticas_carteles[] = [];
 estadisticasConteo: estadisticas_conteo_dispositivos[] = [];
 numProcesadosCategoria: datos_graficas[];
 numTotalProcesados: number = 0;

 tableStateOptions =  [{label: 'Carteles', value: 'cartel'}, {label: 'Conteo de dispositivos', value: 'dispositivo'}];
 tableStateValue = 'cartel';

 //Filtros
 filtrado: boolean = false;
 elementos_ids$: Observable<number[]>;
 fechas$: Observable<Date[]>;


  private setStateSelectors() {
    this.elementos_ids$ = this.state.elementoSeleccionado$;
    this.fechas$ = this.state.periodoFechas$;
  }

 
 ngOnInit(): void {  
 
  combineLatest([this.elementos_ids$, this.fechas$]).subscribe(([elementosIds, fechas]) => {
    // this.filtroState.updateLoading(true);
    this.obtenerEstadisticas(elementosIds, fechas);
    // this.filtroState.updateLoading(false);

  });
    


 }



 obtenerEstadisticas( elementos_ids?: number[], fechas?: Date[]) {
 

  this.elementosService.getEstadisticasRespuestas(elementos_ids, fechas).subscribe(
    (estadisticas: resultados_ordenados_elementos) => {
      this.estadisticas = estadisticas;  //tengo los elementos, pero no se que uso darles
      const estadisticas_length: resultados_ordenados = this.estadisticasMethods.fromOrdenadosElementosToOrdenados(estadisticas);
      this.estadisticas_resultados_carteles = this.estadisticasMethods.mapearEstadisticasResultados(estadisticas_length, "carteles", false);
      this.estadisticas_resultados_conteo = this.estadisticasMethods.mapearEstadisticasResultados(estadisticas_length, "conteoDispositivos", false);

      this.initCarteles(elementos_ids,fechas);
      this.initConteoDispositivos(elementos_ids,fechas);
      this.initNumProcesadosCategoria (elementos_ids,fechas);


    });
 }

 initNumProcesadosCategoria(elementos_ids?: number[], fechas?: Date[]) {
  this.elementosService.getNumProcesadosByCategoria(elementos_ids,fechas ).subscribe(
    (numProcesados: {conteo_dispositivos: number, carteles: number}) => {
      this.numTotalProcesados = numProcesados.carteles + numProcesados.conteo_dispositivos;
      this.numProcesadosCategoria = [
        {
          etiqueta: 'Carteles',
          valor: numProcesados.carteles,
          color: 'blue'
        },
        {
          etiqueta: 'Conteo de dispositivos',
          valor: numProcesados.conteo_dispositivos,
          color: 'pink'
        }
      ]
    }
  )

  }

 initCarteles(elementos_ids?: number[], fechas?: Date[]) {
  this.elementosService.getEstadisticasCarteles(elementos_ids,fechas).subscribe(
    (carteles: estadisticas_carteles[]) => {
      this.estadisticasCartel = carteles;
    } 
  );
 }

 initConteoDispositivos(elementos_ids?: number[], fechas?: Date[]){
  this.elementosService.getEstadisticasConteoDispositivos(elementos_ids,fechas).subscribe(
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
         header: `Procesados del elemento ${elemento.nombre}`,
        width: '70%',
        baseZIndex: 10000,
        maximizable: true,
        data: {
          elemento: elementoConProcesados,
          datos_graficas: datos
        }
    
      });

    });

   
  });
 
 }





}
