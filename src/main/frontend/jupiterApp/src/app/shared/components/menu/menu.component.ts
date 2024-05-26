import {Component, OnInit, signal} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MenuItem} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";

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
  ],
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent implements OnInit{

  menuItems = signal<MenuItem[]>([
    {
      label: 'Home',
      icon: 'pi pi-home',
      route:'home'
    },
    {
      label: 'Libros/Cómics',
      icon: 'pi pi-book',
      route:'home/book'
    },
  ]);
  constructor(){

  }

  ngOnInit(): void {
  }
}
