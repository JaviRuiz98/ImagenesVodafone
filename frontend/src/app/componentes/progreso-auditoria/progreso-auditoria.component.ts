import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { auditoria } from 'src/app/interfaces/auditoria';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progreso-auditoria',
  templateUrl: './progreso-auditoria.component.html',
  styleUrls: ['./progreso-auditoria.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule
  ], providers: [
    ConfirmationService,
    MessageService
  ]

})
export class ProgresoAuditoriaComponent {

  id_auditoria_seleccionada: number | undefined;
  auditoria_seleccionada: auditoria | undefined;

  constructor(
    private auditoriaService: AuditoriaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}  

  ngOnInit(): void {
    this.id_auditoria_seleccionada = this.auditoriaService.id_auditoria_seleccionada;
    this.auditoriaService.getAuditoriaById(this.id_auditoria_seleccionada).subscribe(auditoria => {
      this.auditoria_seleccionada = auditoria;
      console.log(this.auditoria_seleccionada)
    });

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
