import { Component, Input, OnInit } from '@angular/core';
import { auditoria } from '../../interfaces/auditoria';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-item-lista-auditoria',
  templateUrl: './item-lista-auditoria.component.html',
  styleUrls: ['./item-lista-auditoria.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
})

export class ItemListaAuditoriaComponent implements OnInit {

  @Input() auditoria = new auditoria(null);

  procesados_imagenes: procesados_imagenes[] = [];

  constructor(private auditoriaService: AuditoriaService, private procesamientoService: ProcesamientoService) { }

  ngOnInit(): void {
    this.inicializaItemListaAuditoria();
  }

  inicializaAuditoria() {
  }

  inicializaItemListaAuditoria() {
    // this.procesamientoService.getProcesados(this.auditoria.id_auditoria).subscribe((procesados)=>{
    //   this.procesados_imagenes = procesados
    //   console.log("aa", this.procesados_imagenes)
    // });
  }
}
