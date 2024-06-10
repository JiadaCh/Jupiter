import {Component, Input, signal} from '@angular/core';
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'shared-submenu',
  standalone: true,
  imports: [
    CommonModule,
    TabMenuModule
  ],
  templateUrl: './tab-menu.component.html',
  styles: ``
})
export class TabMenuComponent {
  @Input() menuItems = signal<MenuItem[]>([]);
}
