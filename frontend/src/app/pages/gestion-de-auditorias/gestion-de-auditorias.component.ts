import { Component,  Input, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { auditoria } from 'src/app/interfaces/auditoria';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { tienda } from 'src/app/interfaces/tienda';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-de-auditorias',
  templateUrl: './gestion-de-auditorias.component.html',
  styleUrls: ['./gestion-de-auditorias.component.css']
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
    private datePipe: DatePipe) { }
 
  ngOnInit(): void {
    this.initTiendas();
  }

  initTiendas() {
    this.tiendasService.getTiendas().subscribe((data: tienda[]) => {
      this.tiendas = data;
    })
  }

  onTiendaSelected(){
    if(this.tiendaSeleccionada){
      this.inicializaAuditorias();
    }
  }

  async nuevaAuditoria() {
    this.auditoriaService.nuevaAuditoria(this.tiendaSeleccionada!.id_tienda).subscribe();
    this.inicializaAuditorias();
  } 
  inicializaAuditorias() {
    this.auditoriaService.getAuditorias(this.tiendaSeleccionada!.id_tienda).subscribe((data)=>{
      this.auditorias = data;

      console.log("auditorias", this.auditorias);
    })
  }

  goToAuditoria(id_auditoria: number){
    this.auditoriaService.id_auditoria_seleccionada = id_auditoria;
    this.router.navigate(['/auditoria']);
  }

  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
  }
  
}