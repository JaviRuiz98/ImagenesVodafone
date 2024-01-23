 
import { DialogModule } from 'primeng/dialog';
import {  Component, Input } from '@angular/core';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';


@Component({
  selector: 'app-dialog-informacion-procesado',
  templateUrl: './dialog-informacion-procesado.component.html',
  styleUrls: ['./dialog-informacion-procesado.component.css'],
  standalone: true,
  imports: [
    DialogModule
  ],
})



export class DialogInformacionProcesadoComponent {

  @Input() mostrar_info: boolean = false;
  @Input() visible_info_dispositivos: boolean = false;
  @Input() procesados_imagenes: procesados_imagenes[] = [];
  @Input() id_procesado: number = 0;
  @Input() procesado: any;

  ngOnInit() {
    console.log(this.procesado);
  }
  
 
 



 



}
