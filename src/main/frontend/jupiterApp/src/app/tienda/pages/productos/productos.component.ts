import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {InputTextModule} from "primeng/inputtext";
import {CurrencyPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "primeng/api";
import {TagAutorComponent} from "@shared/components/tag-autor/tag-autor.component";
import {TagGeneroComponent} from "@shared/components/tag-genero/tag-genero.component";
import {ProductoService} from "@service/producto.service";
import {Producto} from "@interface/producto.interface";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'tienda-productos',
  standalone: true,
  imports: [
    ButtonModule,
    DataViewModule,
    InputTextModule,
    NgForOf,
    NgOptimizedImage,
    PaginatorModule,
    SharedModule,
    TagAutorComponent,
    TagGeneroComponent,
    RouterLink,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './productos.component.html',
  styles: ``
})
export class ProductosComponent implements OnInit{
  private productoService = inject(ProductoService);
  rows:number=12;
  layout:"grid" | "list" = 'grid';

  productos:Producto[] = [];

  filteredItems: Producto[] = [];
  searchText: string = '';

  ngOnInit(): void {
    this.productoService.getProducto().subscribe(res =>{
      this.productos = res
      this.filterItems();
    } );
  }


  onSearchTextChange() {
    this.filterItems();
  }

  filterItems() {
    let filtered = this.productos;

    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filtered = filtered.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTextLower)
      );
    }

    this.filteredItems = filtered;
  }
}
