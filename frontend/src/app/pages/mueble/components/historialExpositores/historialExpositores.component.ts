import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { muebles } from 'src/app/interfaces/muebles';

@Component({
  selector: 'app-historialExpositores',
  templateUrl: './historialExpositores.component.html',
  styleUrls: ['./historialExpositores.component.css']
})
export class HistorialExpositoresComponent implements OnInit {

  mueble:muebles = this.dialogConfig.data.mueble

  constructor(  public dialogConfig : DynamicDialogConfig,) { }

  ngOnInit() {
  }

}
