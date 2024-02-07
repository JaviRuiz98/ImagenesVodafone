import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { tienda } from 'src/app/interfaces/tienda';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { muebles } from 'src/app/interfaces/muebles';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
  providers: [MessageService]
})

export class TiendasComponent implements OnInit{

  tiendas: tienda[] = [];
  verFormularioNuevaTienda: boolean = false;
  sfidInput: string = '';
  comunidadInput: string = '';
  parametrosSteps: any; //TIPAR CON LABEL Y ROUTERLINK
  activeIndex: number = 0;
  botonSiguienteDeshabilitado: boolean = false;
  botonAtrasDeshabilitado: boolean = false;
  contenidoBotonSiguiente: string = 'Siguiente';
  lista1: any[] = [];
  lista2: any[] = [];

  
  constructor(private TiendasService: TiendasService, private MueblesService: MueblesService, private messageService: MessageService){}
  ngOnInit(): void {
    this.TiendasService.getAllTiendas().subscribe((response: tienda[]) => {
      this.tiendas = response;
    })
    this.MueblesService.getAllMuebles().subscribe((response: muebles[]) => {
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
    ];
  }
  crearNuevaTienda(){
    this.verFormularioNuevaTienda = true;
  }
  botonSiguiente(){
    if(this.sfidInput === '' || this.comunidadInput === ''){
      this.messageService.add({severity:'error', summary:'Error!', detail:'Los campos necesarios no estan completos.'});
    } else{
      if(this.activeIndex < 1){
        this.activeIndex++;
        this.botonAtrasDeshabilitado = false;
        this.botonSiguienteDeshabilitado = false;
        if(this.activeIndex === 1){
          this.contenidoBotonSiguiente = 'Crear Tienda';        
        }
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
}
