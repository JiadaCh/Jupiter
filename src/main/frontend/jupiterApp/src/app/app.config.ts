import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {ConfirmationService, MessageService} from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withViewTransitions(
      {
        skipInitialTransition: true,
      })),
    provideHttpClient(),
    provideAnimationsAsync("animations"),
    MessageService,ConfirmationService,
    importProvidersFrom(BrowserModule, BrowserAnimationsModule)
  ]
};
