import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  constructor(private router: Router ) { }

  ngOnInit() {
  }

  goToAdmin() {
    this.router.navigate(['/validator']);
  }
  goToGestionAuditorias() {
    this.router.navigate(['/gestionAuditorias']);
  }

  goToExpositor() {
    this.router.navigate(['/expositor']);
    }
  goToMueble() {
    this.router.navigate(['/muebles']);
  }
  goToTienda() {
    this.router.navigate(['/tiendas']);
  }
    
}
