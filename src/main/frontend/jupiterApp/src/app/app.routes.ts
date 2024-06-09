import { Routes } from '@angular/router';
import {checkAuthGuard} from "./guard/check-auth.guard";
import {adminGuard} from "./guard/admin.guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'comics',
    loadComponent: () => import('./home/pages/comics/comics.component').then(m => m.ComicsComponent),
    title: 'Comic',
  },
  {
    path: 'comics/comic/:id',
    loadComponent: () => import('./home/pages/detalle-comic/detalle-comic.component').then(m => m.DetalleComicComponent),
    title: 'Comic',
  },
  {
    path: 'libros',
    loadComponent: () => import('./home/pages/libros/libros.component').then(m => m.LibrosComponent),
    title: 'Libro',
  },
  {
    path: 'libros/libro/:id',
    loadComponent: () => import('./home/pages/detalle-libro/detalle-libro.component').then(m => m.DetalleLibroComponent),
    title: 'Libro',
  },
  {
    path:'tienda',
    children:[
      {
        path: 'productos',
        loadComponent: () => import('./tienda/pages/productos/productos.component').then(m => m.ProductosComponent),
        title: 'Tienda'
      },
      {
        path: 'productos/producto/:id',
        loadComponent: () => import('./tienda/pages/detalle-producto/detalle-producto.component').then(m => m.DetalleProductoComponent),
        title: 'Tienda'
      },
      {
        path:'', redirectTo: 'productos', pathMatch: 'full',
      },
      {
        path:'**', redirectTo: 'productos', pathMatch: 'full',
      }
    ]
  },
  {
    path: 'user',
    loadComponent: () => import('./usuario/page/usuario/usuario.component').then(m => m.UsuarioComponent),
    children: [
      {
        path:':id/perfil',
        loadComponent: () => import('./usuario/page/perfil/perfil.component').then(m => m.PerfilComponent),
        title: 'Perfil',
      },
      {
        path:':id/pedidos',
        loadComponent: () => import('./usuario/page/historial-pedido/historial-pedido.component').then(m => m.HistorialPedidoComponent),
        title: 'Historial de pedidos',
      },
      {
        path:':id/productos',
        loadComponent: () => import('./usuario/page/productos/productos.component').then(m => m.ProductosComponent),
        title: 'Productos',
      },

      {
        path:'', redirectTo: 'login', pathMatch: 'full',
      },
      {
        path:'**', redirectTo: 'login', pathMatch: 'full',
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login',
    canActivate:[
      checkAuthGuard
    ]
  },
  {
    path: 'admin',
    loadComponent:() =>  import('./admin/pages/admin/admin.component').then(m => m.AdminComponent),
    title: 'Panel de administrador',
    canActivate:[adminGuard],
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
        path: '',
        redirectTo: 'autor',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
