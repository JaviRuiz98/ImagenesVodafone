 
import { DialogModule } from 'primeng/dialog';
import { Component, Input } from '@angular/core';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';

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

  visible_info_procesamiento: boolean = false;
  visible_info_procesamiento_click: boolean = false;

  constructor( private publicMethodsService: PublicMethodsService) { }



    onMouseOver(event: MouseEvent) {
      this.visible_info_procesamiento = true;
      const tagElement = event.target as HTMLElement;
      tagElement.classList.add('cursor-zoom');
    
  }

  onMouseOut(event: MouseEvent) {
      this.visible_info_procesamiento = false;
  }
  

  getSeverityCartel(procesado: string): string {
    return this.publicMethodsService.getSeverityCartel(procesado);
  }

  getSeverityDispositivos(numero_dispositivos: number, huecos_esperados: number): string {
    return this.publicMethodsService.getSeverityDispositivos(numero_dispositivos, huecos_esperados);
  }

}
