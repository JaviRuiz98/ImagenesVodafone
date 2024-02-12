import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';

import { tienda } from 'src/app/interfaces/tienda';
import { muebles } from 'src/app/interfaces/muebles';
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
    id_tienda: 0,
    pertenencia_mueble_tienda: []
  };
  verFormularioNuevaTienda: boolean = false;
  sfidInput: string = 'vfvf';
  comunidadInput: string = 'fvf';
  parametrosSteps: any; //TIPAR CON LABEL Y ROUTERLINK
  activeIndex: number = 0;
  listaTodosMuebles: muebles[] = [];
  listaMueblesNuevaTienda: muebles[] = [];
  editarTiendaCreada: boolean = false;


  constructor(private TiendasService: TiendasService, private MueblesService: MueblesService, private messageService: MessageService, private ExpositoresService: ExpositoresService){}
  ngOnInit(): void {
    this.TiendasService.getAllTiendas().subscribe((response: tienda[]) => {
      this.tiendas = response;
      console.log(response)
    })
    this.MueblesService.getAllMuebles().subscribe((response: muebles[]) => {
      this.listaTodosMuebles = response;
      console.log(response)

    })
    this.parametrosSteps = [
      {
        label: 'Datos Tienda',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Muebles',
        command: (event: any) => {
            this.activeIndex = 1;

        }
      },
      {
        label: 'Confirmar',
        command: (event: any) => {
            this.activeIndex = 2;
        }
      }
    ];
  }
  iniciarFormularioNuevaTienda(){
    this.verFormularioNuevaTienda = true;
    this.activeIndex = 0;
    this.listaMueblesNuevaTienda = [];
    this.editarTiendaCreada = false;
  }
  botonSiguiente(){
    if(this.sfidInput === '' || this.comunidadInput === ''){
      this.messageService.add({severity:'error', summary:'Error!', detail:'Los campos necesarios no estan completos.'});
    } else{
      if(this.activeIndex < 2){
        this.activeIndex++;
      } else{
        this.nuevaTienda.sfid = this.sfidInput;
        this.verFormularioNuevaTienda = false;
        console.log(this.listaMueblesNuevaTienda, this.nuevaTienda);

        /*this.TiendasService.newTienda(this.nuevaTienda, this.listaMueblesNuevaTienda).subscribe((response: any) => {
          this.tiendas = response;
        })*/
      }
    }
  }
  botonAtras(){
    if(this.activeIndex > 0){
      this.activeIndex--;
    }
  }
  editarTienda(tienda: tienda){
    
    this.activeIndex = 1;
    this.verFormularioNuevaTienda = true;
    this.editarTiendaCreada = true;
    
  }
}
