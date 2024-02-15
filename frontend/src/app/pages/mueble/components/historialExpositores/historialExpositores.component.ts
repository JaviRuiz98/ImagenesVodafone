import { Component, Input, OnInit } from '@angular/core';
import { Expositor } from 'src/app/interfaces/expositor';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { pertenencia_expositor_mueble } from 'src/app/interfaces/pertenencia_expositor_mueble';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';

@Component({
  selector: 'app-historialExpositores',
  templateUrl: './historialExpositores.component.html',
  styleUrls: ['./historialExpositores.component.css']
})
export class HistorialExpositoresComponent implements OnInit {

  
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  pertenencias_expositor_mueble: pertenencia_expositor_mueble[] = [];


  nombreFiltro: string = '';



  constructor(public dialogConfig : DynamicDialogConfig, private expositorService: ExpositoresService) { }

  ngOnInit() {
    if (this.dialogConfig.data) {
      const id_mueble = this.dialogConfig.data.id_mueble;
      this.expositorService.getPertenenciaExpositorMueblebyIdMueble(id_mueble).subscribe(
        
      )
    }
  
  }



 
 
}
