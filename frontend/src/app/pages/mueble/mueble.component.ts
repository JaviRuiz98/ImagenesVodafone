import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { muebles } from 'src/app/interfaces/muebles';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';


@Component({
  selector: 'app-mueble',
  templateUrl: './mueble.component.html',
  styleUrls: ['./mueble.component.css']
})
export class MuebleComponent implements OnInit {

  mueblesDispostivos: muebles[] = [];
  mueblesCarteles: muebles[] = [];
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  tableStateOption: any[] = [{label:'Dispositivos', icon: 'pi pi-mobile', value: 'dispositivos',  styleClass: "optionColorVodafone" }, {label:'Carteles' ,icon: 'pi pi-book', value: 'cartel', styleClass: "optionColorVodafone" }];
  tableSelected:string = 'dispositivos';

  selectedMueble: muebles | undefined;

  @ViewChild('miTabla') miTabla!: Table;

  constructor( private muebleService: MueblesService  ) { }

  ngOnInit() {
    this.loadMuebles();
  }
  private loadMuebles() {
   this.muebleService.getAllMuebles().subscribe(muebles => {
     this.mueblesDispostivos = muebles.filter(mueble => mueble.categoria === 'dispositivos');
     this.mueblesCarteles = muebles.filter(mueble => mueble.categoria === 'cartel');
     console.log(muebles);
   })
  }

  cambiarTabla() {
    this.miTabla.reset();
  }



}
