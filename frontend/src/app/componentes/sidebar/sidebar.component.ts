import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PromptsService } from 'src/app/servicios/prompts/prompts.service';
import { estadisticaPrompts } from 'src/app/interfaces/estadistica';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    CardModule,
    CommonModule,
    ProgressBarModule
  ],
})
 
export class SidebarComponent implements OnInit {

  sidebarVisible: boolean = false;
  estadisticaPrompts: estadisticaPrompts[] = [];

  constructor(private promptsService: PromptsService) { }

  inicializarEstadisticasPrompts() {
    this.promptsService.getEstadisticasPrompts().subscribe({
      next: (data) => {
        this.estadisticaPrompts = data;

        this.estadisticaPrompts = this.estadisticaPrompts.map((estadistica) => ({
          ...estadistica,
          porcentaje_exito: estadistica.porcentaje_exito? parseFloat(estadistica.porcentaje_exito.toFixed(2)) : 0
        }))
      }
    })
  }
  ngOnInit(): void {
    this.inicializarEstadisticasPrompts();
  }
}
