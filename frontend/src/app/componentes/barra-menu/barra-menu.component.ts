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
  currentState: 'home' | 'auditoria' | 'admin' | 'empty' = 'home';
  contenidoBotonVolver: string = '';
  iconoBotonVolver: string = '';
  volverHome: string = 'Volver a inicio';
  volverHomeIcono: string = 'pi pi-house';


  constructor(
    private localStorageService: LocalStorageService,
    private tiendasService: TiendasService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) 
  {}

  ngOnInit(): void {
    this.initTiendas();
    const routeChanges = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map(() => this.activatedRoute)
    );
    routeChanges.subscribe((route) => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      if (route.snapshot.data['stateBarra']) {
        this.setStateBarra(route.snapshot.data['stateBarra']);
      } else {
        console.warn(`La ruta "${route.pathFromRoot.map((r) => r).join('/')}" no ha definido "stateBarra"`);
      }
    });
  }

  initTiendas() {
    this.tiendasService.getAllTiendas().subscribe((data: tienda[]) => {
      this.tiendas = data;
    })
  }

  setStateBarra(newState: 'home' | 'auditoria' | 'admin' | 'empty'): void {
    this.currentState = newState;
  }

  getTiendaTitle(): string {
    if (this.tiendaSeleccionada) {
      return this.tiendaSeleccionada.sfid;
    }else{
      return '';
    }
  }

  onTiendaSelected(){
    if (this.tiendaSeleccionada){
      this.localStorageService.setItem('tiendas', this.tiendaSeleccionada.id_tienda );
    }else{
      this.localStorageService.removeItem('tiendas');
    }
  }

  private  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  }
  contenidoBotonVolverAtras() {
    const rutaActual = this.router.url;
    console.log('rutaActual', rutaActual);
    switch (rutaActual) {
      case '/home':
        this.contenidoBotonVolver = '';
        this.iconoBotonVolver = '';    
      break;
      case '/auditoria':
        this.contenidoBotonVolver = this.volverHome;
        this.iconoBotonVolver = this.volverHomeIcono;    
        this.router.navigate(['/home']);
      break;
      }
  }
}