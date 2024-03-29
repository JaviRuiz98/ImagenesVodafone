import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class PublicMethodsService {

  constructor(
    private datePipe: DatePipe,
  ) { }

  getSeverityCartel(result: string): string {
    switch (result) {
        case 'muy alta':
            return 'success' as string;
 
        case 'alta':
        case 'media':
        case 'otro idioma':
            return 'warning' as string;

        case 'baja':
        case 'muy baja':
        case 'ninguna':
            return 'danger' as string;
       
        default:
            return 'primary';
    }
  };

    getSeverityDispositivos(numero_dispositivos: number, huecos_esperados: number): string {
        if (numero_dispositivos == huecos_esperados) {
            return 'success';
        } else if ( Math.abs(numero_dispositivos - huecos_esperados) == 1 ) { //el error es de solo un dispositivo
            return 'warning';
        } else {
            return 'danger';
        }
    }

    getSeverityEstadoAuditoria(estado: string): string {
        switch (estado) {
            case 'en progreso':
                return 'warning' as string;
            case 'finalizada':
                return 'success' as string;
            case 'caducada':
                return 'danger' as string;
            default:
                return 'primary';
        }
    }

    formatDate(date: Date): string | null {
        return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
      }
}
