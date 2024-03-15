import { Component,  Input, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { auditoria } from 'src/app/interfaces/auditoria';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { tienda } from 'src/app/interfaces/tienda';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { InformeService } from 'src/app/servicios/informe/informe.service';


@Component({
  selector: 'app-gestion-de-auditorias',
  templateUrl: './gestion-de-auditorias.component.html',
  styleUrls: ['./gestion-de-auditorias.component.css'],
  providers: [ConfirmationService, MessageService]
})

export class GestionDeAuditoriasComponent implements OnInit {

  @Input() id_tienda: any;

  usuario: string = 'usuario_prueba';

  tiendas: tienda[] = [];
  tiendaSeleccionada: tienda | undefined;
  auditorias: auditoria[] = [];
  cargando_auditorias: boolean = false;

  constructor(
    private auditoriaService: AuditoriaService , 
    private router: Router,
    private tiendasService: TiendasService,
    public publicMethodsService: PublicMethodsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private informeService: InformeService,

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
        this.goToAuditoria(data);
      }
    );
  } 

  inicializaAuditorias() {
    this.auditoriaService.getAuditorias(this.tiendaSeleccionada!=undefined? this.tiendaSeleccionada.id : 0).subscribe((data)=>{
      this.auditorias = data;
      this.cargando_auditorias = false;

    })
  }

  goToAuditoriaOInforme(auditoria: auditoria){
    if(auditoria.estados_auditoria.estado !== 'en progreso'){
      this.goToTemplateInformeAuditoria(auditoria.id);
    }else{
      this.goToAuditoria(auditoria);
    }
  }
  goToAuditoria(auditoria: auditoria){
    this.localStorageService.setItem('auditoria_seleccionada', auditoria);
    this.router.navigate(['/auditoria']);
  }
  goToTemplateInformeAuditoria(id_auditoria: number){
    this.informeService.getUrlIdAuditoriaCifrada(id_auditoria).subscribe(
      (data)=>{
        console.log('respuesta url encriptada', data);
        this.router.navigate(['/templateInforme/'+ data]);
      }, (error)=>{
        console.error(error);
      })
  }

  getSeverityEstadoAuditoria(estado: string): string {
    return this.publicMethodsService.getSeverityEstadoAuditoria(estado);
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

  contenidoBotonAuditoriaInforme(estado: string) {
    switch (estado) {
      case 'en progreso':
        return 'Ir Auditoría';
      default:
        return 'Ver Informe';
    }
  }
  contenidoIconoAuditoriaInforme(estado: string) {
    switch (estado) {
      case 'en progreso':
        return 'pi pi-pencil';
      default:
        return 'pi pi-file';
    }
  }

  enviarInforme(id_auditoria: number) {

    console.log(id_auditoria);
    const body = {
      id_auditoria: id_auditoria,
      usuario: this.usuario
    }

    this.messageService.add({ severity: 'info', summary: 'Enviando informe', detail: 'Enviando informe...' });

    this.informeService.enviarInforme(body).subscribe(
      (data)=>{
        this.messageService.add({ severity: 'success', summary: 'Enviado', detail: 'Informe enviado correctamente ' });
      }, (error)=>{
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al enviar el informe' });
      }
    )
  }

  descargarInforme(id_auditoria: number){
    const body = {
      id_auditoria: id_auditoria,
      usuario: this.usuario
    }

    this.messageService.add({ severity: 'info', summary: 'Descargando informe', detail: 'Descargando informe...' });

    this.informeService.descargarInforme(body).subscribe(
      (blob)=>{
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'informe-auditoria.pdf'; // Nombre de archivo deseado
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error al descargar el informe:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al descargar el informe' });
      });
  }



}