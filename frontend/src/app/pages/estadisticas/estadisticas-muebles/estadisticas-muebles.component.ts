import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription, combineLatest, takeUntil } from 'rxjs';
import { ProcesadosDetallesComponent } from 'src/app/componentes/procesados-detalles/procesados-detalles.component';
import { datos_graficas, datos_graficas_multidatos } from 'src/app/interfaces/datos_graficas';
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


 constructor  ( 
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
 estadisticasCartelMultidatos: datos_graficas_multidatos[] = [];

 estadisticasConteo: estadisticas_conteo_dispositivos[] = [];
 estadisticasConteoMultidatos: datos_graficas_multidatos[] = [];


 numProcesadosCategoria: datos_graficas[];
 numTotalProcesados: number = 0;

 //Grid
 tableStateOptions =  [{label: 'Carteles', value: 'cartel'}, {label: 'Conteo de dispositivos', value: 'dispositivo'}];
 tableStateValue = 'cartel';
 emptyArrayCargandoTabla = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
 loadingTables: boolean = true;

 //Filtros
 lastElementoIds: number[] = [];
 lastFechas: Date[] = [];
 private primeraVez = true; // Bandera para controlar la primera ejecución
 private subscripcionFiltroState: Subscription;


 filtrado: boolean = false;
 elementos_ids$: Observable<number[]>;
 fechas$: Observable<Date[]>;


  private setStateSelectors() {
    this.elementos_ids$ = this.state.elementoSeleccionado$;
    this.fechas$ = this.state.periodoFechas$;
  }

 
  ngOnInit(): void {
    this.subscripcionFiltroState = combineLatest([this.elementos_ids$, this.fechas$]).subscribe(([elementosIds, fechas]) => {
      if (this.primeraVez) {
        this.primeraVez = false;
        this.obtenerEstadisticas(elementosIds, fechas);

      }
      // Verifica si los arrays son iguales,
      const elementosIdsCambiaron = !this.arraysIguales(elementosIds, this.lastElementoIds);
      const fechasCambiaron = !this.fechasIguales(fechas, this.lastFechas);
  
      // Si alguno de los arrays cambió (incluyendo cambios a o desde un estado vacío)
      if (elementosIdsCambiaron || fechasCambiaron) {
        this.lastElementoIds = [...elementosIds]; // Actualiza la última referencia conocida
        this.lastFechas = [...fechas]; // Actualiza la última referencia conocida
        this.obtenerEstadisticas(elementosIds, fechas);
      }
    });
  }

  // Método para comparar el contenido de dos arrays
  private arraysIguales(arr1: number[], arr2: number[]): boolean {
    return arr1.length === arr2.length && arr1.every((valor, index) => valor === arr2[index]);
  }

  // Método para comparar dos arrays de fechas
  private fechasIguales(arr1: Date[], arr2: Date[]): boolean {
    return arr1.length === arr2.length && arr1.every((fecha, index) => fecha.getTime() === arr2[index].getTime());
  }
 ngOnDestroy(): void {
  this.subscripcionFiltroState.unsubscribe();
}



 obtenerEstadisticas( elementos_ids?: number[], fechas?: Date[]) {
  

  this.elementosService.getEstadisticasRespuestas(elementos_ids, fechas).subscribe(
    (estadisticas: resultados_ordenados_elementos) => {
      this.estadisticas = estadisticas;  //tengo los elementos, pero no se que uso darles
      const estadisticas_length: resultados_ordenados = this.estadisticasMethods.fromOrdenadosElementosToOrdenados(estadisticas);
      this.estadisticas_resultados_carteles = [...this.estadisticasMethods.mapearEstadisticasResultados(estadisticas_length, "carteles", false)];
      this.estadisticas_resultados_conteo = [...this.estadisticasMethods.mapearEstadisticasResultados(estadisticas_length, "conteoDispositivos", false)];
      
      this.loadingTables = true;
      this.initCarteles(elementos_ids,fechas);
      this.initConteoDispositivos(elementos_ids,fechas);
      this.loadingTables = false;
      
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
  );


  }

 initCarteles(elementos_ids?: number[], fechas?: Date[]) {
  this.elementosService.getEstadisticasCarteles(elementos_ids,fechas).subscribe(
    (carteles: estadisticas_carteles[]) => {
      this.estadisticasCartel = carteles;
      for (const carteles of this.estadisticasCartel) {
        const dataCartel = this.getDataCartel(carteles);
        this.estadisticasCartelMultidatos.push(dataCartel);
      }
    } 
  );
 }

 initConteoDispositivos(elementos_ids?: number[], fechas?: Date[]){
  this.elementosService.getEstadisticasConteoDispositivos(elementos_ids,fechas).subscribe(
    (conteo: estadisticas_conteo_dispositivos[]) => {
      this.estadisticasConteo = conteo;
      for (const dispositivos of this.estadisticasConteo) {
        const dataCartel = this.getDataDispositivos(dispositivos);
        this.estadisticasConteoMultidatos.push(dataCartel);
      }
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

 getDataCartel(cartel: estadisticas_carteles): datos_graficas_multidatos {
  return {
    etiquetas: ['Respuestas'], // Etiqueta general para la única barra
    leyenda: ['Muy alta', 'alta', 'Media', 'Baja', 'Muy baja', 'Ninguna', 'Otro idioma'], // Cada segmento de la barra
    datos: [
      [cartel.muy_alta ?? 0],
      [cartel.alta ?? 0],
      [cartel.media ?? 0],
      [cartel.baja ?? 0],
      [cartel.muy_baja ?? 0],
      [cartel.ninguna ?? 0],
      [cartel.otro_idioma ?? 0]
    ], // Los valores de cada segmento en la única barra
    color: ["green", "orange", "yellow", "pink", "magenta", "red", "gray"] // Colores para cada segmento
  }
}
getDataDispositivos( dispositivos: estadisticas_conteo_dispositivos): datos_graficas_multidatos {
  return{
    etiquetas: ['Respuestas'], // Etiqueta general para la única barra
    leyenda: ['Imágen no válida','Correcto', 'Diferencia de 1 o 2', 'Diferencia de 3 o 4', 'Diferencia de 5 o más'], // Cada segmento de la barra
    datos: [
      [dispositivos.error ?? 0],
      [dispositivos.diferencia[0] + dispositivos.diferencia[1] ?? 0],
      [dispositivos.diferencia[1]  + dispositivos.diferencia[2]?? 0],
      [dispositivos.diferencia[3] + dispositivos.diferencia[4] ?? 0],
      [this.get5Plus(dispositivos)?? 0]
    ], // Los valores de cada segmento en la única barra
    color: ["gray", "green",  "yellow", "orange", "red"] // Colores para cada segmento
  }
}

customSortConteo(event: any): void {
  const field = event.field;
  const order = event.order; // 1 para ascendente, -1 para descendente

  // Asumiendo que 'estadisticasConteo' es tu array de datos
  this.estadisticasConteo.sort((data1, data2) => {
    let value1 = this.getTotalDispositivos(data1); // Obtiene el valor para el primer elemento
    let value2 = this.getTotalDispositivos(data2); // Obtiene el valor para el segundo elemento

    let result = null;

    if (value1 == null && value2 != null)
      result = -1; // Considera null como menor que cualquier número
    else if (value1 != null && value2 == null)
      result = 1; // Considera cualquier número como mayor que null
    else if (value1 == null && value2 == null)
      result = 0; // Considera null igual a null
    else
      result = value1 < value2 ? -1 : (value1 > value2) ? 1 : 0; // Ordenamiento normal

    return result * order; // Ajusta el resultado basándose en si es ascendente o descendente
  });
}

customSortCartel(event: any): void {
  const field = event.field;
  const order = event.order; // 1 para ascendente, -1 para descendente

  // Asumiendo que 'estadisticasConteo' es tu array de datos
  this.estadisticasCartel.sort((data1, data2) => {
    let value1 = this.getTotalCarteles(data1); // Obtiene el valor para el primer elemento
    let value2 = this.getTotalCarteles(data2); // Obtiene el valor para el segundo elemento

    let result = null;

    if (value1 == null && value2 != null)
      result = -1; // Considera null como menor que cualquier número
    else if (value1 != null && value2 == null)
      result = 1; // Considera cualquier número como mayor que null
    else if (value1 == null && value2 == null)
      result = 0; // Considera null igual a null
    else
      result = value1 < value2 ? -1 : (value1 > value2) ? 1 : 0; // Ordenamiento normal

    return result * order; // Ajusta el resultado basándose en si es ascendente o descendente
  });
}




}
