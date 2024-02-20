import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidadorComponent } from './pages/validador/validador.component';
import { HomeComponent } from './pages/home/home.component';
import { GestionDeAuditoriasComponent } from './pages/gestion-de-auditorias/gestion-de-auditorias.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { MuebleComponent } from './pages/mueble/mueble.component';
 import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { ElementosComponent } from './pages/elementos/elementos.component';


const routes: Routes = [
  { 
    path: "home", component: HomeComponent ,
    data: { stateBarra: 'home' },
  },
  { 
    path: "gestionAuditorias", component: GestionDeAuditoriasComponent, 
    data: { stateBarra: 'gestionAuditorias' },
  },
  { 
    path: "auditoria", component: AuditoriaComponent, 
    data: { stateBarra: 'auditorias' },
  },
  {
    path: "tiendas", component: TiendasComponent,
    data: { stateBarra: 'tiendas' },
  },
  { 
    path: "elementos", component: ElementosComponent ,
    data: { stateBarra: 'elementos' },
  },
  { 
    path : "validator", component: ValidadorComponent, 
    data: { stateBarra: 'admin' },
  },
  { 
    path: "gestionAuditorias", component: GestionDeAuditoriasComponent, 
    data: { stateBarra: 'gestionAuditorias' },
  },
   { path: 'muebles', component: MuebleComponent , 
    data: { stateBarra: 'empty' },
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