import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { GestionDeAuditoriasComponent } from './pages/gestion-de-auditorias/gestion-de-auditorias.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { MuebleComponent } from './pages/mueble/mueble.component';
 import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { ElementosComponent } from './pages/elementos/elementos.component';
import { TemplateInformeComponent } from './pages/template-informe/template-informe.component';
import { PlanoTiendaComponent } from './pages/plano-tienda/plano-tienda.component';
import { LoginComponent } from './pages/login/login.component';
import { UniformesComponent } from './pages/uniformes/uniformes.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';

const routes: Routes = [
  {
    path: "login", component: LoginComponent ,
    data: { stateBarra: 'login',  },
  },
  { 
    path: "home", component: HomeComponent ,
    data: { stateBarra: 'home' },
  },
  { 
    path: "gestionAuditorias", component: GestionDeAuditoriasComponent, 
    data: { stateBarra: 'gestionAuditorias', title: 'Gestion de Auditorias', icono: 'book' },
  },
  { 
    path: "auditoria", component: AuditoriaComponent, 
    data: { stateBarra: 'auditorias', title: 'Gestion de Auditorias', icono: 'book' },
  },
  {
    path: "tiendas", component: TiendasComponent,
    data: { stateBarra: 'tiendas', title: 'Gestion de Tiendas', icono: 'home' },
  },
  { 
    path: "elementos", component: ElementosComponent ,
    data: { stateBarra: 'elementos', title: 'Gestion de Elementos', icono: 'book' },
  },

   { path: 'muebles', component: MuebleComponent , 
    data: { stateBarra: 'empty' , title: 'Gestion de Muebles', icono: 'book' },
   },
   {
    path: "templateInforme/:id_auditoria_cifrada", component: TemplateInformeComponent, 
    data: { stateBarra: 'templateAuditorias', title: 'Informe de Auditoria', icono: 'file' },
   },
   {
    path: "plano_tienda", component: PlanoTiendaComponent, 
    data: { stateBarra: 'plano_tienda', title: 'Plano de Tienda', icono: 'map' },
   },
   {
    path: "uniformes", component: UniformesComponent, 
    data: { stateBarra: 'uniformes' , title: 'Reponer Uniformes', icono: 'shopping-cart' },
   },
   {
    path: "estadisticas", component: EstadisticasComponent,
    data: { stateBarra: 'estadisticas', title: 'Estadisticas', icono: 'chart-line' },
   },
   {
      path: '', redirectTo: '/login', pathMatch: 'full' 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }