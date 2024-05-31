import {Component, Input, Output} from '@angular/core';
import {PaginatorModule, PaginatorState} from "primeng/paginator";

@Component({
  selector: 'shared-paginador',
  standalone: true,
  imports: [
    PaginatorModule
  ],
  templateUrl: './paginador.component.html',
  styles: ``
})
export class PaginadorComponent {

  @Output() first: number = 0;

  @Output() rows: number = 10;
  @Input() totalRecords: number = 0;

  onPageChange(event: PaginatorState) {
    this.first = event.first? event.first : 0;
    this.rows = event.rows ? event.rows : 10;
  }
}
