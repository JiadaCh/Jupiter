import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CarouselModule} from "primeng/carousel";
import {ComicService} from "../../core/service/comic.service";
import {LibroService} from "../../core/service/libro.service";
import {ProductoService} from "../../core/service/producto.service";
import {Comic} from "../../core/interface/comic.interface";
import {Libro} from "../../core/interface/libros.interface";
import {Producto} from "../../core/interface/producto.interface";
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CarouselModule,
    ButtonModule,
    NgOptimizedImage,
    SkeletonModule
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  libros: Libro[] = [];
  comics: Comic[] = [];
  productos: Producto[] = [];
  private comicService = inject(ComicService);
  private libroService = inject(LibroService);
  private productoService = inject(ProductoService);

  ngOnInit(): void {
    this.comicService.getComic().subscribe(res => {
      this.comics = res
    });

    this.libroService.getLibro().subscribe(res => {
      this.libros = res
    });

    this.productoService.getProducto().subscribe(res => {
      this.productos = res
    });
  }

}
