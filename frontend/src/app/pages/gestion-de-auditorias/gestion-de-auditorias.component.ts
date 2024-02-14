import { Component,  Input, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { auditoria } from 'src/app/interfaces/auditoria';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { tienda } from 'src/app/interfaces/tienda';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-gestion-de-auditorias',
  templateUrl: './gestion-de-auditorias.component.html',
  styleUrls: ['./gestion-de-auditorias.component.css'],
  providers: [ConfirmationService, MessageService]
})

export class GestionDeAuditoriasComponent implements OnInit {

  @Input() id_tienda: any;

  tiendas: tienda[] = [];
  tiendaSeleccionada: tienda | undefined;
  auditorias: auditoria[] = [];

  constructor(
    private auditoriaService: AuditoriaService , 
    private router: Router,
    private tiendasService: TiendasService,
    private publicMethodsService: PublicMethodsService,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
 
  ngOnInit(): void {
    this.initTiendas();
    this.inicializaAuditorias();
  }

  initTiendas() {
    this.tiendasService.getTiendas().subscribe((data: tienda[]) => {
      this.tiendas = data;
    })
  }

  onTiendaSelected(){
    this.inicializaAuditorias();
  }

  async nuevaAuditoria() {
    this.auditoriaService.nuevaAuditoria(this.tiendaSeleccionada?.id_tienda || 0).subscribe(
      (data)=>{
        this.inicializaAuditorias();
        this.goToAuditoria(data.id_auditoria);
      }
    );
  } 

  inicializaAuditorias() {
    this.auditoriaService.getAuditorias(this.tiendaSeleccionada?.id_tienda || 0).subscribe((data)=>{
      this.auditorias = data;

      console.log("auditorias", this.auditorias);
    })
  }

  goToAuditoria(id_auditoria: number){
    this.auditoriaService.id_auditoria_seleccionada = id_auditoria;

    this.router.navigate(['/auditoria']);
  }

  getSeverityEstadoAuditoria(estado: string): string {
    return this.publicMethodsService.getSeverityEstadoAuditoria(estado);
  }

  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
  }

  crearAuditoriaGlobal() {
    this.confirmationService.confirm({
      message: '¿Seguro de que quieres crear una auditoría global y marcar como caducadas todas las que estén en progreso?',
      header: 'Crear auditoria global',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Creación en curso', detail: 'Creando auditoria global' });
          this.auditoriaService.createAuditoriaGlobal().subscribe(
            (data) => {
              this.inicializaAuditorias();
              this.messageService.add({ severity: 'success', summary: 'Creada', detail: 'Auditoria global creada con éxito' });
            }, (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creando auditoria global' });
            }
          )
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Auditoria global no creada' });
              
      }
  });
  }
}