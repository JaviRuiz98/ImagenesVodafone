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
    BarraDeBarrasComponent
  ], providers: [
    ConfirmationService,
    MessageService
  ]

})
export class ProgresoAuditoriaComponent implements OnInit {


  id_auditoria_seleccionada: number | undefined;
  auditoria_seleccionada: auditoria | undefined;

  datos_barra_progreso: number[] = [];

  constructor(
    private auditoriaService: AuditoriaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}  

  ngOnInit(): void {
    this.id_auditoria_seleccionada = this.auditoriaService.id_auditoria_seleccionada;

    this.actualizarProgresoAuditoria(this.auditoriaService.id_auditoria_seleccionada);

  }

  public actualizarProgresoAuditoria(id_auditoria: number) {
    this.auditoriaService.getAuditoriaById(this.auditoriaService.id_auditoria_seleccionada).subscribe(
      auditoria => {
        this.auditoria_seleccionada = auditoria
        console.log("auditoria_seleccionada", this.auditoria_seleccionada);
        this.getBarraProgresoAuditoria(this.auditoriaService.id_auditoria_seleccionada);

      }, error => { 
        console.log(error) 
      }
    );
  }

  getBarraProgresoAuditoria(id_auditoria_seleccionada: number) {
    this.auditoriaService.getBarraProgresoAuditoria(id_auditoria_seleccionada).subscribe(
      (data) => {
        this.datos_barra_progreso = data;
        console.log("barra de progreso", this.datos_barra_progreso);
      }, (error) => { console.log(error) }
    )
  }

  terminarAuditoria() {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres terminar esta auditoria?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditoriaService.terminarAuditoria(this.auditoriaService.id_auditoria_seleccionada).subscribe(
          (data) => {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Auditoria finalizada correctamente' });
            this.router.navigate(['/gestionAuditorias']);
          }, (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo terminar la auditoria' });
          }
        );        
      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: '', detail: 'Acción cancelada' });
      }
    })
  }

  getColorByValue(value: number): string {
    if(value == undefined) return 'transparent';
    else if(value <= 1) return 'green';
    else if(value <= 2) return 'yellow';
    else return 'red';
  }

  
}
