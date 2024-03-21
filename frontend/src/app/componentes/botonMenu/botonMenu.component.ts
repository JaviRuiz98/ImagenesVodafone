import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botonMenu',
  templateUrl: './botonMenu.component.html',
  styleUrls: ['./botonMenu.component.css'], 
  standalone: true, 
  imports: [ ],
})
export class BotonMenuComponent implements OnInit {

  @Input () icono: string;
  @Input () texto: string;
  @Input () ruta: string;
  @Input () titulo: string;
  constructor( private router: Router) { }

  ngOnInit() {
  }

  goToRuta() {
    const url = `/${this.ruta}`;
    console.log(url);
    this.router.navigate([url]);
  }

}
