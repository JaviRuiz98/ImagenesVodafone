import { Component,  Input, OnInit  } from '@angular/core';

import { Router } from '@angular/router';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';
import { Expositor } from 'src/app/interfaces/expositor';

import { ExpositorModule } from './expositor.module';


@Component({
  selector: 'app-expositores',
  templateUrl: './expositores.component.html',
  styleUrls: ['./expositores.component.css'],
})


export class ExpositoresComponent implements OnInit {
  


  expositores!: Expositor[];
  expositorSeleccionado!: Expositor;
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  constructor(private router: Router, private expositoresService: ExpositoresService) { }

  inicializaExpositores() {
    this.expositoresService.getExpositores().subscribe((expositores: Expositor[]) => {
      this.expositores = expositores;
      console.log("expositores", expositores);
    });
  }

 

  ngOnInit(): void {
    this.inicializaExpositores();



  }


}