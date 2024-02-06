import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidadorComponent } from './pages/validador/validador.component';
import { HomeComponent } from './pages/home/home.component';
import { GestionDeAuditoriasComponent } from './pages/gestion-de-auditorias/gestion-de-auditorias.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { TiendasService } from './servicios/tiendas/tiendas.service';
import { TiendasComponent } from './pages/tiendas/tiendas.component';

const routes: Routes = [
  { 
    path: "home", component: HomeComponent ,
    data: { stateBarra: 'home' },
  },
  { 
    path : "validator", component: ValidadorComponent, 
    data: { stateBarra: 'admin' },
  },
  { 
    path: "gestionAuditorias", component: GestionDeAuditoriasComponent, 
    data: { stateBarra: 'gestionAuditorias' },
  },
  { 
    path: "auditoria", component: AuditoriaComponent, 
    data: { stateBarra: 'auditorias' },
  },

  // { path: 'muebles', },

  {
    path: "tiendas", component: TiendasComponent,
    data: { stateBarra: 'tiendas' },
  },

  // { path:"expositores",}
  {
    path: '', redirectTo: '/home', pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }