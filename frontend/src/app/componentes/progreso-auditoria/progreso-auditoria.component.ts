import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { muebles } from 'src/app/interfaces/muebles';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { auditoria } from 'src/app/interfaces/auditoria';

interface Bar {
  value: number;
  color: string;
  width: number;
}

@Component({
  selector: 'app-progreso-auditoria',
  templateUrl: './progreso-auditoria.component.html',
  styleUrls: ['./progreso-auditoria.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ProgresoAuditoriaComponent {
  @Input() valores_progresos: number[] = []; // Espera un arreglo de valores numéricos

  id_auditoria_seleccionada: number | undefined;
  auditoria_seleccionada: auditoria | undefined;

  bars: Bar[] = [];

  constructor(
    private auditoriaService: AuditoriaService
  ) {}  

  ngOnInit(): void {
    this.id_auditoria_seleccionada = this.auditoriaService.id_auditoria_seleccionada;
    this.auditoriaService.getAuditoriaById(this.id_auditoria_seleccionada).subscribe(auditoria => {
      this.auditoria_seleccionada = auditoria;
      console.log(this.auditoria_seleccionada)
    });

  //   if (!this.valores_progresos) return;

  //   this.bars = this.muebles_auditoria.map(mueble => ({
  //     const value = mueble.expositores?.[0]?.procesados_imagenes?.[0]?.probabilidades_respuesta_carteles?.id;
  //     return {
  //       value: value ?? 0, // Usa el operador nullish coalescing para manejar undefined o null
  //       color: this.getColorByValue(value),
  //       width: 100 / this.muebles_auditoria.length
  //     };
  //   }));
  }

  getColorByValue(value: number): string {
    if(value == undefined) return 'transparent';
    else if(value <= 1) return 'green';
    else if(value <= 2) return 'yellow';
    else return 'red';
  }
}
