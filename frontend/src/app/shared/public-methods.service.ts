import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicMethodsService {

  constructor() { }

  getSeverityCartel(result: string): string {
    switch (result) {
        case 'muy alta':
            return 'success' as string;
 
        case 'alta':
            return 'warning' as string; 
        case 'media':
            return 'warning' as string;

        case 'baja':
            return 'danger' as string;
        case 'muy baja':
            return 'danger' as string;
        case 'ninguna':
            return 'danger' as string;
       
        default:
            return '';
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
}
