import { Component, Input, OnInit } from '@angular/core';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';

import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
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

  //url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  @Input() auditoria = new auditoria(null);

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
    private tiendasService: TiendasService,
    private mueblesService: MueblesService,
    private procesamientoService: ProcesamientoService,
    private messageService: MessageService
    ) {}

    ngOnInit(): void {
      this.inicializaImagenesReferencia(this.auditoria.id_mobiliario);
    }

  async inicializaImagenesReferencia(id_mobiliario: number, filtros?: filtro_procesados) {
    //id mobiliario
    this.mueblesService.getMueblesFiltered(filtros).subscribe( (data: muebles[]) => {
      this.muebles = data;
      console.log("muebles", this.muebles);
    }), (error: Error) => { console.log(error) }
  }
}