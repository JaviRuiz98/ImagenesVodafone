import { Component, OnInit } from '@angular/core';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';


import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';

import { MessageService } from 'primeng/api';
import { filtro_procesados } from 'src/app/interfaces/filtro_procesados';
import { muebles } from 'src/app/interfaces/muebles';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css'],
  providers: [MessageService]
})

export class ValidadorComponent implements OnInit{
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';



  //sfid = "FRANQ982";
  
  muebles: muebles[] = [];

  imagenAProcesar = new File([""], "");

  cargas_procesamiento : boolean[] = [];
  modos_visualizacion : string[] = [];  

  filtros: filtro_procesados = {
    orden: "date_desc",
    categoria: "",
    prompts: [],
    respuestas_carteles: [],
    rangos_cuentas: {min: 0, max: 100}    
  }

  constructor( 
    private mueblesService: MueblesService,
    private procesamientoService: ProcesamientoService,
    private messageService: MessageService, 
    private router: Router
    ) {}

  async inicializaImagenesReferencia( filtros?: filtro_procesados) {

    //const tiendaSelected: number | undefined = this.localStorageService.getItem('tiendas');
    //const mobiliarioSelected: number | undefined= this.localStorageService.getItem('mobiliario');
                                
    this.mueblesService.getMueblesFiltered(filtros).subscribe( (data: muebles[]) => {
      this.muebles = data;
      console.log("muebles", this.muebles);
    }), (error: Error) => { console.log(error) }

  }


  ngOnInit(): void {
   this.inicializaImagenesReferencia();    
   console.log("muebles", this.muebles);

  }

  // async recibirFile(event: {archivo:File}, id_expositor_selected: number, id_mueble_selected: number) {
  //   this.imagenAProcesar = event.archivo;
  //   this.cargas_procesamiento[id_expositor_selected]= true;   
  //   this.messageService.add({ severity: 'info', summary: 'Cargando', detail: 'La imagen se está procesando' });

  //   this.procesamientoService.postProcesamientoImagenes(id_expositor_selected, id_mueble_selected, this.imagenAProcesar).subscribe( 
  //     ( response: procesados_imagenes ) => {
  //       console.log("response", response);
  //       this.cargas_procesamiento[id_expositor_selected] = false;
  //       this.modos_visualizacion[id_expositor_selected] = 'historial';        
  //       this.actualizarProcesamientoEnMueble(id_expositor_selected, response);
  //       this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Imagen procesada correctamente' });
  //     }, ( error: any ) => {
  //       console.log("error", error);
  //       this.cargas_procesamiento[id_expositor_selected] = false;
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error procesando imagen' });
  //   })
  // }

  // actualizarProcesamientoEnMueble(id_expositor_selected: number, response: procesados_imagenes) {
  //   for (const mueble of this.muebles) {
  //     const expositorIndex = mueble.expositores.findIndex((expositor) => expositor.id_expositor === id_expositor_selected);
  //     if (expositorIndex !== -1) {
  //       mueble.expositores[expositorIndex].procesados_imagenes.unshift(response);
  //       break; 
  //     }
  //   }
  // }

  enviarFiltroProcesados(filtros:filtro_procesados) {
    console.log("filtros", filtros);
    this.inicializaImagenesReferencia( filtros);  
  }
  
  volver() {
    this.router.navigate(['/home']);
  }

}
