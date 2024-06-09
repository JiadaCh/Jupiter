import {Component} from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'shared-loading',
  standalone: true,
    imports: [
        ProgressSpinnerModule
    ],
  templateUrl: './loading.component.html',
  styles: ``
})
export class LoadingComponent {

}
