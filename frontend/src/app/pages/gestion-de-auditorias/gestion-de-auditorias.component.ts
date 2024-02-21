import { Component,  Input, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { auditoria } from 'src/app/interfaces/auditoria';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { tienda } from 'src/app/interfaces/tienda';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { jsPDF } from 'jspdf';




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

  cargando_auditorias: boolean = false;

  constructor(
    private auditoriaService: AuditoriaService , 
    private router: Router,
    private tiendasService: TiendasService,
    private publicMethodsService: PublicMethodsService,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) { }
 
  ngOnInit(): void {
    this.cargando_auditorias = true;
    this.initTiendas();
    this.inicializaAuditorias();
  }

  initTiendas() {
    this.tiendasService.getAllTiendas().subscribe((data: tienda[]) => {
      this.tiendas = data;
    })
  }

  onTiendaSelected(){
    this.inicializaAuditorias();
  }

  async nuevaAuditoria() {
    this.auditoriaService.nuevaAuditoria(this.tiendaSeleccionada? this.tiendaSeleccionada.id : 0).subscribe(
      (data)=>{
        this.inicializaAuditorias();
        this.goToAuditoria(data.id);
      }
    );
  } 

  inicializaAuditorias() {
    this.auditoriaService.getAuditorias(this.tiendaSeleccionada!=undefined? this.tiendaSeleccionada.id : 0).subscribe((data)=>{
      this.auditorias = data;
      this.cargando_auditorias = false;
    })
  }

  goToAuditoria(id_auditoria: number){
    this.localStorageService.setItem('id_auditoria_seleccionada', id_auditoria);
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
  enviarInforme(id_auditoria: number) {
  }

  descargarInforme(auditoria: auditoria){
    console.log(auditoria);
    //const informe = this.generarPDF();
  }
  informe(){
    const informe = this.generarPDF();
    
    // const pdfBlob = new Blob([informe.output('blob')], { type: 'application/pdf' });
    // const formData = new FormData();
    // formData.append('pdfFile', pdfBlob, 'generated.pdf');
    // this.auditoriaService.informe(formData).subscribe((response: any) => {
    // })
  }
  generarPDF(){
    let informe = new jsPDF();
    informe.setFont("helvetica","bold"); 
    informe.text('Resumen de la auditoria ', 20, 20);
    informe.save()
    return informe;
  }
}