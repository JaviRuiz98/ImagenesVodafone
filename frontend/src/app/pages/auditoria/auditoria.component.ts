import { Component, OnInit } from '@angular/core';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';

import { MessageService } from 'primeng/api';
import { filtro_procesados } from 'src/app/interfaces/filtro_procesados';
import { muebles } from 'src/app/interfaces/muebles';
import { auditoria } from 'src/app/interfaces/auditoria';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';

@Component({
  selector: 'auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})

export class AuditoriaComponent implements OnInit{

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  muebles_auditoria: muebles[] | undefined;

  muebles: muebles[] = [];

  id_auditoria_seleccionada: number = 0;
  auditoria_seleccionada: auditoria = new auditoria(null);

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
    private auditoriaService: AuditoriaService ,
    private procesamientoService: ProcesamientoService,
    private messageService: MessageService
    ) {}

    ngOnInit(): void {
      this.id_auditoria_seleccionada = this.auditoriaService.id_auditoria_seleccionada;

      this.auditoriaService.getAuditoriaById(this.auditoriaService.id_auditoria_seleccionada).subscribe(
        auditoria => {
          this.auditoria_seleccionada = auditoria
          this.inicializaImagenesReferencia();
        }, error => { console.log(error) }
      );      
    }

    async inicializaImagenesReferencia() {
      this.auditoriaService.getMueblesAndExpositoresWithProcesadosByIdAuditoria(this.auditoriaService.id_auditoria_seleccionada).subscribe(
        (data: muebles[]) => {
          this.muebles = data;
        }, (error: Error) => { console.log(error) }
      );
    }

    enviarFiltroProcesados(filtros:filtro_procesados) {
      this.inicializaImagenesReferencia();  
    }

    async recibirFile(event: {archivo:File}, id_expositor_selected: number, id_mueble_selected: number) {
      this.imagenAProcesar = event.archivo;
      this.cargas_procesamiento[id_expositor_selected]= true;   
      this.messageService.add({ severity: 'info', summary: 'Cargando', detail: 'La imagen se está procesando' });
      this.procesamientoService.postProcesamientoImagenes(id_expositor_selected, id_mueble_selected, this.auditoriaService.id_auditoria_seleccionada, this.imagenAProcesar).subscribe( 
        ( response: procesados_imagenes ) => {
          this.cargas_procesamiento[id_expositor_selected] = false;
          this.modos_visualizacion[id_expositor_selected] = 'historial';        
          this.actualizarProcesamientoEnMueble(id_expositor_selected, response);
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Imagen procesada correctamente' });
        }, ( error: any ) => {
          console.log("error", error);
          this.cargas_procesamiento[id_expositor_selected] = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error procesando imagen' });
      })
    }

    actualizarProcesamientoEnMueble(id_expositor_selected: number, response: procesados_imagenes) {
      for (const mueble of this.muebles) {
        const expositorIndex = mueble.expositores.findIndex((expositor) => expositor.id === id_expositor_selected);
        if (expositorIndex !== -1) {
          mueble.expositores[expositorIndex].procesados_imagenes.unshift(response);
          break; 
        }
      }
    }
}