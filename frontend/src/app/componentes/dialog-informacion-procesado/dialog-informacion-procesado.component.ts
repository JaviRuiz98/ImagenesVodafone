 
import { DialogModule } from 'primeng/dialog';
import { Component, Input } from '@angular/core';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-dialog-informacion-procesado',
  templateUrl: './dialog-informacion-procesado.component.html',
  styleUrls: ['./dialog-informacion-procesado.component.css'],
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    TagModule,
    OverlayPanelModule
  ],
})

export class DialogInformacionProcesadoComponent {

  @Input() mostrar_info: boolean = false;
  @Input() visible_info_dispositivos: boolean = false;
  @Input() procesados_imagenes: procesados_imagenes[] = [];
  @Input() id_procesado: number = 0;
  @Input() procesado: any;

  val: boolean = true;

  getSeverityCartel(result: string) {
    switch (result) {
        case 'muy alta':
            return 'success' as string; ;     
        case 'alta':
            return 'warning' as string;     
        case 'media':
            return 'warning' as string;
        case 'baja':
            return 'danger' as string;
        case 'muy baja':
            return 'danger' as string;
        case 'ninguna':
            return 'danger' as string;
        
        default:
            return undefined;
    }
  };

  getSeverityDispositivos(numero_telefonos: number, huecos_esperados: number) {
    if (numero_telefonos == huecos_esperados) {
        return 'success';
    } else {
        return 'warning';
    }
  }


}
