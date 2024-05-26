import { Routes } from '@angular/router';
import {HomeComponent} from "./home/pages/home/home.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/pages/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path:'', redirectTo: 'control-flow', pathMatch: 'full',
      }
    ]
  },
  {
    path: 'admin',
    loadComponent:() =>  import('./admin/pages/admin/admin.component').then(m => m.AdminComponent),
    children: [
      {
        path:'autor',
        title: 'Autor',
        loadComponent:() =>  import('./admin/pages/autor-crud/autor-crud.component').then(m => m.AutorCrudComponent),
      },{
        path:'comic',
        title: 'Comic',
        loadComponent:() =>  import('./admin/pages/comic-crud/comic-crud.component').then(m => m.ComicCrudComponent),
      },{
        path:'libro',
        title: 'Libro',
        loadComponent:() =>  import('./admin/pages/libro-crud/libro-crud.component').then(m => m.LibroCrudComponent),
      },{
        path:'editorial',
        title: 'Editorial',
        loadComponent:() =>  import('./admin/pages/editorial-crud/editorial-crud.component').then(m => m.EditorialCrudComponent),
      },{
        path:'genero',
        title: 'Genero',
        loadComponent:() =>  import('./admin/pages/genero-crud/genero-crud.component').then(m => m.GeneroCrudComponent),
      },{
        path:'usuario',
        title: 'Usuario',
        loadComponent:() =>  import('./admin/pages/usuario-crud/usuario-crud.component').then(m => m.UsuarioCrudComponent),
      },
      {
        path:'', redirectTo: 'control-flow', pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
