import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PrimeNGConfig} from 'primeng/api';
import {MenuComponent} from "@shared/components/menu/menu.component";
import {ScrollTopModule} from "primeng/scrolltop";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "./core/service/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, ScrollTopModule, BreadcrumbModule, NgClass, NgIf],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Jupiter';
  private authService = inject(AuthService);

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.authService.loadLocalStorage();
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1300,   // tooltip
    };
  }


}
