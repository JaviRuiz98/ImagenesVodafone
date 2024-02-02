import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorComponent } from './pages/validador/validador.component';
import { HomeComponent } from './pages/home/home.component';

import { GestionDeAuditoriasComponent } from './pages/gestion-de-auditorias/gestion-de-auditorias.component';
import { CargarAuditoriaComponent } from './pages/cargar-auditoria/cargar-auditoria.component';

const routes: Routes = [

  //{ path: "", component: ValidadorComponent },
  { path: "", component: GestionDeAuditoriasComponent },
  { path: "auditoria", component: CargarAuditoriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
