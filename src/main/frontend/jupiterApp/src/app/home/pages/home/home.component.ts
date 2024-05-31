import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CarouselModule} from "primeng/carousel";
import {ComicService} from "@service/comic.service";
import {LibroService} from "@service/libro.service";
import {ProductoService} from "@service/producto.service";
import {Comic} from "@interface/comic.interface";
import {Libro} from "@interface/libros.interface";
import {Producto} from "@interface/producto.interface";
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {delay} from "rxjs";
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
export class HomeComponent implements OnInit{
  private comicService = inject(ComicService);
  private libroService = inject(LibroService);
  private productoService = inject(ProductoService);

  libros:Libro[] = [];
  comics:Comic[] = [];
  productos:Producto[] = [];
  ngOnInit(): void {
    this.comicService.getComic().subscribe(res =>{
      this.comics = res
    } );

    this.libroService.getLibro().subscribe(res =>{
      this.libros = res
    } );

    this.productoService.getProducto().subscribe(res =>{
      this.productos = res
    } );
  }

}
