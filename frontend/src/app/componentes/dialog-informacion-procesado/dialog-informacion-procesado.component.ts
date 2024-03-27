 
import { DialogModule } from 'primeng/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';
import { ButtonModule } from 'primeng/button';
import { ProcesadosService } from 'src/app/servicios/procesados/procesados.service';

@Component({
  selector: 'app-dialog-informacion-procesado',
  templateUrl: './dialog-informacion-procesado.component.html',
  styleUrls: ['./dialog-informacion-procesado.component.css'],
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    TagModule,
    OverlayPanelModule,
    ButtonModule
  ],
})

export class DialogInformacionProcesadoComponent implements OnInit{

  @Input() mostrar_info: boolean = false;
  @Input() visible_info_dispositivos: boolean = false;
  @Input() procesados_imagenes: procesados_imagenes[] = [];
  @Input() id_procesado: number = 0;
  @Input() procesado: any;
  @Input() posicionGaleria: number = 0;
  val: boolean = true;
  verPrompt: boolean = false;
  visible_info_procesamiento: boolean = false;
  visible_info_procesamiento_click: boolean = false;
  likeButton: string = "pi pi-thumbs-up";
  dislikeButton: string = "pi pi-thumbs-down";
  verResumen: boolean = true;

  constructor(private procesadosService: ProcesadosService, private publicMethodsService: PublicMethodsService) { }

  ngOnInit(): void {
    console.log('procesado', this.procesado)
  }
  getSeverityCartel(procesado: string): string {
    return this.publicMethodsService.getSeverityCartel(procesado);
  }

  getSeverityDispositivos(numero_dispositivos: number, huecos_esperados: number): string {
    return this.publicMethodsService.getSeverityDispositivos(numero_dispositivos, huecos_esperados);
  }
  funcionFeedback(procesado: procesados_imagenes, likeDislike: boolean | null) {
    if(procesado.feedback_humano == null){
        procesado.feedback_humano = likeDislike;
    } else {
        if(procesado.feedback_humano == likeDislike){
            procesado.feedback_humano = null;
        } else {
            procesado.feedback_humano = likeDislike;
        }
    }
    if(procesado.feedback_humano == true){
        this.likeButton = "pi pi-thumbs-up-fill";
        this.dislikeButton = "pi pi-thumbs-down";
    } else if(procesado.feedback_humano == false){
        this.likeButton = "pi pi-thumbs-up";
        this.dislikeButton = "pi pi-thumbs-down-fill";
    } else if(procesado.feedback_humano == null){
        this.likeButton = "pi pi-thumbs-up";
        this.dislikeButton = "pi pi-thumbs-down";
    }
    this.procesadosService.updateFeedbackProcesado(procesado.id, procesado.feedback_humano).subscribe();
  }
  mostrarPrompt(){
    this.verPrompt = true;
  }
}
