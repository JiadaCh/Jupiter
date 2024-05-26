import {Component, signal} from '@angular/core';
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'menu-admin',
  standalone: true,
  imports: [
    CommonModule,
    TabMenuModule
  ],
  templateUrl: './menu-admin.component.html',
  styles: ``
})
export class MenuAdminComponent {
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
      icon: 'pi pi-user',
      route:'usuario'
    },
  ]);
}
