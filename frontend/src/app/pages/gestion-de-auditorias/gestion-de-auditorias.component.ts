import { Component,  Input, OnInit  } from '@angular/core';
import { BarraMenuComponent } from 'src/app/componentes/barra-menu/barra-menu.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';


import { ItemListaAuditoriaComponent } from 'src/app/componentes/item-lista-auditoria/item-lista-auditoria.component';

import { auditoria } from 'src/app/interfaces/auditoria';

import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';

@Component({
  selector: 'app-gestion-de-auditorias',
  templateUrl: './gestion-de-auditorias.component.html',
  styleUrls: ['./gestion-de-auditorias.component.css'],
  standalone: true,
  imports: [
    BarraMenuComponent,
    CardModule,
    PanelModule,
    ButtonModule,
    ItemListaAuditoriaComponent,
    CommonModule
  ],
})
 


export class GestionDeAuditoriasComponent implements OnInit {

  @Input() id_tienda: any;
  id_tienda______SUSTITUIR: number = 1;


  tiendaTitle: string = "FRANQ982"
  auditorias: auditoria[] = [];


  constructor(private auditoriaService: AuditoriaService , private router: Router) { }
 

  nuevaAuditoria() {


    this.auditoriaService.nuevaAuditoria(this.id_tienda______SUSTITUIR, this.auditorias[0].id_mobiliario).subscribe();


    this.router.navigate(['/auditoria'], { queryParams: { id_tienda: this.id_tienda } });
  }

  volver() {
    window.location.href = '/';
  }

  inicializaAuditorias() {

    this.auditoriaService



    this.auditoriaService.getAuditorias(this.id_tienda______SUSTITUIR).subscribe((data)=>{
      this.auditorias = data;
      console.log("auditorias", this.auditorias);
    })
  }


  ngOnInit(): void {
    this.inicializaAuditorias();
  }


}
