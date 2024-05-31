import {Component, signal} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {TabMenuComponent} from "@shared/components/submenu/tab-menu.component";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    TabMenuComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  menuItems = signal<MenuItem[]>([
    {
      label: 'Autor',
      icon: 'pi pi-user',
      route:'autor'
    },{
      label: 'Comic',
      icon: 'pi pi-book',
      route:'comic'
    },{
      label: 'Libro',
      icon: 'pi pi-book',
      route:'libro'
    },{
      label: 'Editorial',
      icon: 'pi pi-building',
      route:'editorial'
    },{
      label: 'Genero',
      icon: 'pi pi-cog',
      route:'genero'
    },{
      label: 'Usuario',
      icon: 'pi pi-users',
      route:'usuario'
    },
  ]);
}
