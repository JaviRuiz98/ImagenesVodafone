import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historialExpositores',
  templateUrl: './historialExpositores.component.html',
  styleUrls: ['./historialExpositores.component.css']
})
export class HistorialExpositoresComponent implements OnInit {

  
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';



  nombreFiltro: string = '';



  constructor(public dialogConfig : DynamicDialogConfig, private expositorService: ExpositoresService,  private datePipe: DatePipe) { }

  ngOnInit() {
    // if (this.dialogConfig.data) {
    //   const id_mueble = this.dialogConfig.data.id_mueble;
    //   this.expositorService.getPertenenciaExpositorMueblebyIdMueble(id_mueble).subscribe(
    //     (pertenencias_expositor_mueble: pertenencia_expositor_mueble[]) => {
    //       this.pertenencias_expositor_mueble = pertenencias_expositor_mueble;
    //     }
    //   )
    // }
  
  }


  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

 
 
}
