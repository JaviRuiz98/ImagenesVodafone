import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidadorComponent } from './pages/validador/validador.component';
import { HomeComponent } from './pages/home/home.component';
import { GestionDeAuditoriasComponent } from './pages/gestion-de-auditorias/gestion-de-auditorias.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { MuebleComponent } from './pages/mueble/mueble.component';
import { ExpositoresComponent } from './pages/expositores/expositores.component';

const routes: Routes = [

  { 
    path: "", component: ExpositoresComponent ,
    data: { stateBarra: 'expositores' },
  },
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

   { path: 'muebles', component: MuebleComponent , 
    data: { stateBarra: 'empty' },
   },

  // {path: "tiendas", },

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