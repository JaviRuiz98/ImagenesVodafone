import { Component,  Input, OnInit  } from '@angular/core';

import { Router } from '@angular/router';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';
import { Expositor } from 'src/app/interfaces/expositor';
import { imagenes } from 'src/app/interfaces/imagenes';
import { ExpositorModule } from './expositor.module';

import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-expositores',
  templateUrl: './expositores.component.html',
  styleUrls: ['./expositores.component.css'],
  providers: [ MessageService, ConfirmationService],  
})


export class ExpositoresComponent implements OnInit {
  


  expositores!: Expositor[];
  expositoresSeleccionados!: Expositor[];
  nuevoExpositor!: Expositor;

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  mostrarDialogoNuevoExpositor = false;
  submitted: boolean = false;
  constructor(private router: Router, private expositoresService: ExpositoresService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  inicializaExpositores() {
    this.expositoresService.getExpositores().subscribe((expositores: Expositor[]) => {
      this.expositores = expositores;
      console.log("expositores", expositores);
    });
  }

 
  AbrirnuevoExpositor() {
    this.nuevoExpositor = {
      id_expositor: 0,
      nombre: '',
      imagen: {
        url:"",
        id_imagen: 0
      }
    };
    this.mostrarDialogoNuevoExpositor = true;
    this.submitted = false;
  }


  guardarExpositor() {
    this.submitted = true;
  }

  hideDialog() {
    this.submitted = false;
    
  }

  activarDesactivarExpositores() {
    
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.expositores.length; i++) {
        if (this.expositores[i].id_expositor === parseInt(id)) {
            index = i;
            break;
        }
    }
    return index;
}



  ngOnInit(): void {
    this.inicializaExpositores();



  }


}
