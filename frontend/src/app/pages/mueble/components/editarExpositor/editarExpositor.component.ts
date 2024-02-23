import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { expositores } from 'src/app/interfaces/expositores';

@Component({
  selector: 'app-editarExpositor',
  templateUrl: './editarExpositor.component.html',
  styleUrls: ['./editarExpositor.component.css']
})
export class EditarExpositorComponent implements OnInit {

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  constructor( public dialogConfig : DynamicDialogConfig) { }

  expositor: expositores = {
    id: 0,
    nombre: '',
    atributos_expositores: [],
  }

  ngOnInit() {
    if (this.dialogConfig.data) {
      this.expositor = this.dialogConfig.data.expositor;
    }
  }

  getImagenModelo(): string | undefined {
    const atributoModelo: atributos_expositores | undefined = this.expositor.atributos_expositores.find((atributo) => atributo.id_categoria === 3);
    
    if (atributoModelo && atributoModelo.elemento) {
      console.log("imagen: "+atributoModelo.elemento.imagenes.url);
      return this.url_imagenes_referencias+atributoModelo.elemento.imagenes.url;
    } else {
      return undefined;
    }

  }


}
