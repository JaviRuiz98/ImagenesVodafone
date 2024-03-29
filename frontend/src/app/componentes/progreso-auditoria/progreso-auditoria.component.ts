import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { auditoria } from 'src/app/interfaces/auditoria';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { BarraDeBarrasComponent } from '../barra-de-barras/barra-de-barras.component';
import { DialogModule } from 'primeng/dialog';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { IrArribaComponent } from '../ir-arriba/ir-arriba.component';

@Component({
  selector: 'app-progreso-auditoria',
  templateUrl: './progreso-auditoria.component.html',
  styleUrls: ['./progreso-auditoria.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    BarraDeBarrasComponent,
    DialogModule,
    IrArribaComponent
  ], providers: [
    ConfirmationService,
    MessageService
  ]

})
export class ProgresoAuditoriaComponent implements OnInit {

  id_auditoria_seleccionada: number | undefined;
  auditoria_seleccionada: auditoria | undefined;
  verDialogInforme: boolean = false;
  datos_barra_progreso: number[] = [];

  constructor(
    private auditoriaService: AuditoriaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}  

  ngOnInit(): void {
    this.auditoria_seleccionada = this.localStorageService.getItem('auditoria_seleccionada');
    this.id_auditoria_seleccionada = this.auditoria_seleccionada.id;
    this.actualizarProgresoAuditoria(this.id_auditoria_seleccionada);
  }

  public actualizarProgresoAuditoria(id_auditoria: number) {
    this.auditoriaService.getAuditoriaById(this.id_auditoria_seleccionada).subscribe(
      auditoria => {
        this.auditoria_seleccionada = auditoria
        this.getBarraProgresoAuditoria(this.id_auditoria_seleccionada);

      }, error => { 
        console.error(error) 
      }
    );
  }

  getBarraProgresoAuditoria(id_auditoria_seleccionada: number) {
    this.auditoriaService.getBarraProgresoAuditoria(id_auditoria_seleccionada).subscribe(
      (data) => {
        this.datos_barra_progreso = data;
      }, (error) => { console.error(error) }
    )
  }

  getColorByValue(value: number): string {
    if(value == undefined) return 'transparent';
    else if(value <= 1) return 'green';
    else if(value <= 2) return 'yellow';
    else return 'red';
  }
  
  terminarAuditoria(auditoria: auditoria) {
    if(auditoria.num_expositores !== auditoria.num_expositores_procesados) {
      const mensaje = '¿Seguro que quieres terminar esta auditoría? Te faltan ' + (auditoria.num_expositores-auditoria.num_expositores_procesados) + ' expositores por procesar.';
      this.dialogoConfirmacionTerminarAuditoria(mensaje);
    } else {
      this.verDialogInforme = true;
      this.marcarAuditoriaComoFinalizada(auditoria.id);
    }    
  }
  
  dialogoConfirmacionTerminarAuditoria(mensaje: string){
    this.confirmationService.confirm({
      message: mensaje,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.marcarAuditoriaComoFinalizada(this.auditoria_seleccionada.id);
        this.verDialogInforme = true;
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: '', detail: 'Acción cancelada' });
      },
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-danger'
    });
  }

  async marcarAuditoriaComoFinalizada(id_auditoria: number){
    this.auditoriaService.terminarAuditoria(id_auditoria).subscribe(
      (data) => {
        console.log('Auditoría marcada como finalizada')
      }, (error) => { console.error(error) }
    )
  }

  onDialogVisibilityChange(visible: boolean): void {
    if (!visible) {
      // El diálogo se cerró, realiza el enrutamiento
      this.router.navigate(['/gestionAuditorias']);
    }
  }

  enviarInforme(){
    if(this.auditoria_seleccionada !== undefined){

    }
  }
  descargarInforme(){
    if(this.auditoria_seleccionada !== undefined){
      
    }
  }
}
