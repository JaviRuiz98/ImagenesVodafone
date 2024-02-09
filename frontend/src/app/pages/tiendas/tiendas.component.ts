import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';

import { tienda } from 'src/app/interfaces/tienda';
import { muebles } from 'src/app/interfaces/muebles';
import { Expositor } from 'src/app/interfaces/expositor';
import { response } from 'express';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
  providers: [MessageService]
})

export class TiendasComponent implements OnInit{

  imagenesRef: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  tiendas: tienda[] = [];
  nuevaTienda: tienda = {
    sfid: '',
    id_tienda: 0
  };
  verFormularioNuevaTienda: boolean = false;
  sfidInput: string = 'vfvf';
  comunidadInput: string = 'fvf';
  parametrosSteps: any; //TIPAR CON LABEL Y ROUTERLINK
  activeIndex: number = 0;
  botonSiguienteDeshabilitado: boolean = false;
  botonAtrasDeshabilitado: boolean = false;
  contenidoBotonSiguiente: string = 'Siguiente';
  listaTodosMuebles: muebles[] = [];
  listaMueblesNuevaTienda: muebles[] = [];

  constructor(private TiendasService: TiendasService, private MueblesService: MueblesService, private messageService: MessageService, private ExpositoresService: ExpositoresService){}
  ngOnInit(): void {
    this.TiendasService.getAllTiendas().subscribe((response: tienda[]) => {
      this.tiendas = response;
    })
    this.MueblesService.getAllMuebles().subscribe((response: muebles[]) => {
      this.listaTodosMuebles = response;
      console.log(this.listaTodosMuebles)
    })
    this.parametrosSteps = [
      {
        label: 'Datos Tienda',
        command: (event: any) => {
          this.activeIndex = 0;
          this.contenidoBotonSiguiente = 'Siguiente'; 
        }
      },
      {
        label: 'Muebles',
        command: (event: any) => {
            this.activeIndex = 1;
            this.contenidoBotonSiguiente = 'Siguiente'; 

        }
      },
      {
        label: 'Confirmar',
        command: (event: any) => {
            this.activeIndex = 2;
            this.contenidoBotonSiguiente = 'Crear Tienda'; 
        }
      }
    ];
  }
  iniciarFormularioNuevaTienda(){
    this.verFormularioNuevaTienda = true;
    this.activeIndex = 0;
  }
  botonSiguiente(){
    if(this.sfidInput === '' || this.comunidadInput === ''){
      this.messageService.add({severity:'error', summary:'Error!', detail:'Los campos necesarios no estan completos.'});
    } else{
      if(this.contenidoBotonSiguiente === 'Siguiente'){
        this.activeIndex++;
        this.botonAtrasDeshabilitado = false;
        this.botonSiguienteDeshabilitado = false;
        console.log(this.listaMueblesNuevaTienda)
      } else{
        this.nuevaTienda.sfid = this.sfidInput;
        this.TiendasService.newTienda(this.nuevaTienda, this.listaMueblesNuevaTienda).subscribe((response: any) => {
        })
      }
    }
  }
  botonAtras(){
    if(this.activeIndex > 0){
      this.activeIndex--;
      this.botonAtrasDeshabilitado = false;
      this.contenidoBotonSiguiente = 'Siguiente';
    } else{
      this.botonAtrasDeshabilitado = true;
    }
  }
  editarTienda(tienda: tienda){
    console.log(tienda)
    this.activeIndex = 1;
    this.verFormularioNuevaTienda = true;
  }
}
