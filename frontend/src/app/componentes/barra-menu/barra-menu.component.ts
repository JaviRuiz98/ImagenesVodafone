import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
export class BarraMenuComponent implements OnInit, AfterViewInit {

  @ViewChild('barraMenu') barraMenu!: ElementRef;

  tiendas: tienda[] = [] ;
  tiendaSeleccionada: tienda | undefined;
  currentState: string = '/home';
  contenidoBotonVolver: string = '';
  iconoBotonVolver: string = '';
  volverHome: string = 'Volver a inicio';
  volverHomeIcono: string = 'pi pi-home';
  volverAtrasIcono: string = 'pi pi-arrow-left';


  constructor(
    private localStorageService: LocalStorageService,
    private tiendasService: TiendasService,
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

  ngAfterViewInit(): void {
    this.obtenerYAlmacenarAnchuraBarra();
  }

  obtenerYAlmacenarAnchuraBarra() {
    const anchura_componente_barra = 120; // anchura de 120px fijada a partir de los estilos
    console.log('Anchura de la barra:', anchura_componente_barra);

    this.localStorageService.setItem('anchura_componente_barra', anchura_componente_barra);
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
    this.currentState = rutaActual;
    switch (rutaActual) {
      case '/home':
      case '/login':
        this.contenidoBotonVolver = '';
        this.iconoBotonVolver = '';    
      break;
      case '/gestionAuditorias':
      case '/tiendas':
      case '/muebles':
      case '/elementos':
        this.contenidoBotonVolver = this.volverHome;
        this.iconoBotonVolver = this.volverHomeIcono;    
      break;
      case '/auditoria':
        this.contenidoBotonVolver = 'Volver a gestion de auditorias';
        this.iconoBotonVolver = this.volverAtrasIcono;    
      break;
      case '/plano_tienda':
        this.contenidoBotonVolver = 'Volver a gestion de tiendas';
        this.iconoBotonVolver = this.volverAtrasIcono;    
      break;
      default:
        this.contenidoBotonVolver = this.volverHome;
        this.iconoBotonVolver = this.volverHomeIcono;
      break;
    }
  }

  volverAtras(iconoVodafonePulsado: boolean){
    const rutaActual = this.router.url;
    if(iconoVodafonePulsado)
    switch (rutaActual) {   
      case '/gestionAuditorias':
      case '/tiendas':
      case '/muebles':
      case '/elementos':
      case '/auditoria':
        this.router.navigate(['/home']);    
      break;
    } else {
      switch (rutaActual) {
        case '/home':
        case '/login':
          this.contenidoBotonVolver = '';
          this.iconoBotonVolver = '';    
          break;
        case '/auditoria':
          this.router.navigate(['/gestionAuditorias']);
          break;
        case '/plano_tienda':
          this.router.navigate(['/tiendas']);
          break;
        default:
          this.router.navigate(['/home']);
          break;
      }
    }
  }
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}