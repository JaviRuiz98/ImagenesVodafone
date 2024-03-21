import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { pertenencia_elementos_atributos } from 'src/app/interfaces/pertenencia_elementos_atributos';

@Component({
  selector: 'app-historialExpositores',
  templateUrl: './historialExpositores.component.html',
  styleUrls: ['./historialExpositores.component.css']
})
export class HistorialExpositoresComponent implements OnInit {

  
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';



  nombreFiltro: string = '';
  pertenencias_expositor_mueble: pertenencia_elementos_atributos[] = [];


  constructor(public dialogConfig : DynamicDialogConfig, private muebleService: MueblesService,  private datePipe: DatePipe) { }

  ngOnInit() {
    if (this.dialogConfig.data) {
      // const id_expositor = this.dialogConfig.data.id_expositor;
      // this.muebleService.getPertenenciaExpositorElementobyIdExpositor(id_expositor).subscribe(
      //   (pertenencias_expositor_mueble: pertenencia_elementos_atributos[]) => {
      //     this.pertenencias_expositor_mueble = pertenencias_expositor_mueble;
      //   }
      // )
    }
  
  }


  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

 
 
}
