import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MenuItem} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {AuthService} from "@service/auth.service";
import {TieredMenuModule} from "primeng/tieredmenu";
import {Router} from "@angular/router";

@Component({
  selector: 'shared-menu',
  standalone: true,
  imports: [
    MenubarModule,
    AvatarModule,
    BadgeModule,
    InputTextModule,
    CommonModule,
    RippleModule,
    ButtonModule,
    NgOptimizedImage,
    BreadcrumbModule,
    TieredMenuModule,
  ],
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent implements OnInit{
  private authService = inject(AuthService);
  private router: Router = inject(Router);

  usuario = computed(
    this.authService.user
  )
  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }
  menuItems = signal<MenuItem[]>([
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink:''
    },
    {
      label: 'Comic',
      icon: 'pi pi-prime',
      routerLink:'comics'
    },
    {
      label: 'Libros',
      icon: 'pi pi-book',
      routerLink:'libros'
    },
    {
      label: 'Tienda',
      icon: 'pi pi-shop',
      routerLink:'tienda'
    },
    {
      label: 'Panel de Administrador',
      icon: 'pi pi-cog',
      routerLink:'admin'
    },
  ]);


  items :MenuItem[]=[];


  constructor(){

  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.items=[
        {
          label: 'Perfil',
          icon: 'pi pi-user',
          routerLink:`user/${this.usuario()?.id}/perfil`
        },{
          separator: true
        },
        {
          label: 'Historial de pedidos',
          icon: 'pi pi-receipt',
          routerLink:`user/${this.usuario()?.id}/pedidos`
        },{
          separator: true
        },
        {
          label: 'Productos',
          icon: 'pi pi-receipt',
          routerLink:`user/${this.usuario()?.id}/productos`
        }

      ];
    },450)
  }
}
