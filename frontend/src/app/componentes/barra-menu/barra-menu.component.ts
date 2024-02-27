import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { tienda } from 'src/app/interfaces/tienda';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Observable, filter, map, of } from 'rxjs';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css'],
  standalone: true,
  imports: [
    ButtonModule,
    SidebarComponent,
    CommonModule,
    FormsModule,
    DropdownModule,
  ],
})
export class BarraMenuComponent implements OnInit {

  tiendas: tienda[] = [] ;
  tiendaSeleccionada: tienda | undefined;
  currentState: string = 'home';
  contenidoBotonVolver: string = '';
  iconoBotonVolver: string = '';
  volverHome: string = 'Volver a inicio';
  volverHomeIcono: string = 'pi pi-home';


  constructor(
    private localStorageService: LocalStorageService,
    private tiendasService: TiendasService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) 
  {}

  ngOnInit(): void {
    this.initTiendas();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.contenidoBotonVolverAtras();
      }
    })
  }

  initTiendas() {
    this.tiendasService.getAllTiendas().subscribe((data: tienda[]) => {
      this.tiendas = data;
    })
  }

  getTiendaTitle(): string {
    if (this.tiendaSeleccionada) {
      return this.tiendaSeleccionada.sfid;
    }else{
      return '';
    }
  }

  contenidoBotonVolverAtras() {
    const rutaActual = this.router.url;
    switch (rutaActual) {
      case '/home':
        this.contenidoBotonVolver = '';
        this.iconoBotonVolver = '';    
      break;
      case '/volverHome':
      case '/gestionAuditorias':
      case '/tiendas':
      case '/muebles':
      case '/elementos':
        this.contenidoBotonVolver = this.volverHome;
        this.iconoBotonVolver = this.volverHomeIcono;    
      break;
      case '/auditoria':
        this.contenidoBotonVolver = 'Volver a gestion de auditorias';
        this.iconoBotonVolver = this.volverHomeIcono;    
      break;
      default:
        this.contenidoBotonVolver = this.volverHome;
        this.iconoBotonVolver = this.volverHomeIcono;
      break;
    }
  }

  volverAtras(){
    const rutaActual = this.router.url;
    console.log('volverAtras', this.router);
    switch (rutaActual) {
      case '/home':
        this.contenidoBotonVolver = '';
        this.iconoBotonVolver = '';    
        break;
      case '/auditoria':
        this.router.navigate(['/gestionAuditorias']);
        break;
      default:
        this.router.navigate(['/home']);
        break;
    }
  }
}