import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';

import { MessageService } from 'primeng/api';
import { filtro_procesados } from 'src/app/interfaces/filtro_procesados';
import { auditoria } from 'src/app/interfaces/auditoria';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { ProgresoAuditoriaComponent } from 'src/app/componentes/progreso-auditoria/progreso-auditoria.component';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { UrlService } from 'src/app/servicios/url/url.service';

@Component({
  selector: 'auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})

export class AuditoriaComponent implements OnInit{

  @ViewChild('progresoRef') progresoAuditoria!: ProgresoAuditoriaComponent;

  url_imagenes: string = '';
  carpeta_imagenes_referencias: string = 'imagenesReferencia/';

  muebles: any[] = [];

  auditoria_seleccionada: auditoria = new auditoria(null);

  imagenAProcesar = new File([""], "");
  evento_nuevo_procesado: Event | undefined;

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
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private urlService: UrlService
    ) {}

    ngOnInit(): void {
      this.auditoria_seleccionada = this.localStorageService.getItem('auditoria_seleccionada')
      this.url_imagenes = this.urlService.url_en_uso + this.carpeta_imagenes_referencias;
      this.auditoriaService.getAuditoriaById(this.auditoria_seleccionada.id).subscribe(
        auditoria => {
          this.auditoria_seleccionada = auditoria
          this.inicializaImagenesReferencia();
        }, error => { console.log(error) }
      );      
    }

    async inicializaImagenesReferencia() {
      this.auditoriaService.getMueblesAndExpositoresWithProcesadosByIdAuditoria(this.auditoria_seleccionada.id).subscribe((data: any[]) => {
          this.muebles = data;
        }, 
        (error: Error) => { console.log(error) }
      );
    }

    enviarFiltroProcesados(filtros:filtro_procesados) {
      this.inicializaImagenesReferencia();  
    }

    async procesarImagen(event: {archivo: File}, id_elemento_selected: number, id_mueble_selected: number) {
      this.imagenAProcesar = event.archivo;
      this.cargas_procesamiento[id_elemento_selected] = true;   
      this.messageService.add({ severity: 'info', summary: 'Cargando', detail: 'La imagen se está procesando' });
    
      try {
        const response: procesados_imagenes = await this.procesamientoService.postProcesamientoImagenes(id_elemento_selected, id_mueble_selected, this.auditoria_seleccionada.id, this.imagenAProcesar).toPromise();
        this.cargas_procesamiento[id_elemento_selected] = false;
        await this.actualizarProcesamientoEnMueble(id_elemento_selected, response);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Imagen procesada correctamente' });
        this.progresoAuditoria.actualizarProgresoAuditoria(this.auditoria_seleccionada.id);
        this.modos_visualizacion[id_elemento_selected] = 'historial';
      } catch (error) {
        console.log("error", error);
        this.cargas_procesamiento[id_elemento_selected] = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error procesando imagen' });
      }
    }
    
    async actualizarProcesamientoEnMueble(id_expositor_selected: number, response: procesados_imagenes) {
      for (const mueble of this.muebles) {
        const expositorIndex = mueble.elementos.findIndex((elementos) => elementos.id === id_expositor_selected);
        if (expositorIndex !== -1) {
          mueble.elementos[expositorIndex].procesados_imagenes.unshift(response);
          break; 
        }
      }
    }
    
}