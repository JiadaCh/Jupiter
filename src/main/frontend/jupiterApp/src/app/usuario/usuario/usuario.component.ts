import {Component, computed, inject, signal} from '@angular/core';
import {MenuItem} from "primeng/api";
import {RouterOutlet} from "@angular/router";
import {TabMenuComponent} from "@shared/components/submenu/tab-menu.component";
import {AuthService} from "../../core/service/auth.service";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    RouterOutlet,
    TabMenuComponent
  ],
  template: `
    <shared-submenu [menuItems]="menuItems"></shared-submenu>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class UsuarioComponent {
  private authService = inject(AuthService);

  usuario = computed(
    this.authService.user
  )

  menuItems = signal<MenuItem[]>([
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      route:`${this.usuario()?.id}/perfil`
    },{
      label: 'Historial de pedidos',
      icon: 'pi pi-receipt',
      route:`${this.usuario()?.id}/pedidos`
    },{
      label: 'Productos',
      icon: 'pi pi-book',
      route:`${this.usuario()?.id}/productos`
    }
  ]);
}
