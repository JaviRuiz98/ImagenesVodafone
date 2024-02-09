import { Component, OnInit } from '@angular/core';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';

import { MessageService } from 'primeng/api';
import { filtro_procesados } from 'src/app/interfaces/filtro_procesados';
import { muebles } from 'src/app/interfaces/muebles';
import { auditoria } from 'src/app/interfaces/auditoria';

@Component({
  selector: 'auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})

export class AuditoriaComponent implements OnInit{

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  muebles_auditoria: muebles[] | undefined;

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
    private auditoriaService: AuditoriaService ,
    private mueblesService: MueblesService,
    private procesamientoService: ProcesamientoService,
    private messageService: MessageService
    ) {}

    ngOnInit(): void {
      
      this.inicializaImagenesReferencia();
    }

    async inicializaImagenesReferencia() {

      //const tiendaSelected: number | undefined = this.localStorageService.getItem('tiendas');
      //const mobiliarioSelected: number | undefined= this.localStorageService.getItem('mobiliario');
                                  
      this.auditoriaService.getMueblesAndExpositoresWithProcesadosByIdAuditoria(this.auditoriaService.id_auditoria_seleccionada).subscribe(
        (data: muebles[]) => {
          this.muebles = data;
          console.log('muebles', this.muebles);
        }, (error: Error) => { console.log(error) }
      );

  
    }

    enviarFiltroProcesados(filtros:filtro_procesados) {
      console.log("filtros", filtros);
      this.inicializaImagenesReferencia();  
    }
}