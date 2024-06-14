import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CarouselModule} from "primeng/carousel";
import {ComicService} from "../../core/service/comic.service";
import {LibroService} from "../../core/service/libro.service";
import {ProductoService} from "../../core/service/producto.service";
import {ComicPag} from "../../core/interface/comic.interface";
import {LibroPag} from "../../core/interface/libros.interface";
import {ProductoPag} from "../../core/interface/producto.interface";
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
  libroPag!: LibroPag;
  comicPag!: ComicPag;
  productoPag!: ProductoPag;
  private comicService = inject(ComicService);
  private libroService = inject(LibroService);
  private productoService = inject(ProductoService);

  ngOnInit(): void {
    this.comicService.getComicPag(0, 10).subscribe(res => {
      this.comicPag = res
    });

    this.libroService.getLibroPag(0, 10).subscribe(res => {
      this.libroPag = res
    });

    this.productoService.getProductoPag(0, 10).subscribe(res => {
      this.productoPag = res
    });
  }

}
