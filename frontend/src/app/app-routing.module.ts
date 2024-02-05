import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidadorComponent } from './pages/validador/validador.component';
import { HomeComponent } from './pages/home/home.component';



import { GestionDeAuditoriasComponent } from './pages/gestion-de-auditorias/gestion-de-auditorias.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';

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
    path: "", component: GestionDeAuditoriasComponent 
  },
  { 
    path: "auditoria", component: CargarAuditoriaComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
