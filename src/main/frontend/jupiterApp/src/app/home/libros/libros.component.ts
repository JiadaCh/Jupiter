import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {LibroService} from "../../core/service/libro.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {TagModule} from "primeng/tag";
import {TagGeneroComponent} from "@shared/components/tag-genero/tag-genero.component";
import {TagAutorComponent} from "@shared/components/tag-autor/tag-autor.component";
import {TableModule} from "primeng/table";
import {SkeletonModule} from "primeng/skeleton";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {MultiSelectChangeEvent, MultiSelectModule} from "primeng/multiselect";
import {GeneroService} from "../../core/service/genero.service";
import {Genero} from "../../core/interface/genero.interface";
import {InputTextModule} from "primeng/inputtext";
import {Autor} from "../../core/interface/autor.interface";
import {AutorService} from "../../core/service/autor.service";
import {Editorial} from "../../core/interface/editorial.interface";
import {EditorialService} from "../../core/service/editorial.service";
import {RouterLink} from "@angular/router";
import {Libro} from "../../core/interface/libros.interface";

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [
    ButtonModule,
    DataViewModule,
    CommonModule,
    TagModule,
    TagGeneroComponent,
    NgOptimizedImage,
    TagAutorComponent,
    TableModule,
    SkeletonModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    InputTextModule,
    RouterLink,
  ],
  templateUrl: './libros.component.html',
  styles: ``
})
export class LibrosComponent implements OnInit{
  private libroService = inject(LibroService);
  private generoService = inject(GeneroService);
  private autorService = inject(AutorService);
  private editorialService = inject(EditorialService);
  rows:number=12;
  layout:"grid" | "list" = 'grid';
  generos:Genero[] = [];
  autores: Autor[] = [];
  libros:Libro[] = [];
  editoriales:Editorial[] = [];
  filteredItems: Libro[] = [];
  selectedAutores: Autor[] = [];
  selectedGeneros:Genero[] = [];
  selectedEditorial:Editorial[] = [];
  searchText: string = '';

  ngOnInit(): void {
    this.libroService.getLibro().subscribe(res =>{
      this.libros = res
      this.filterItems();
    } );
    this.editorialService.getEditorial().subscribe(res => this.editoriales = res);
    this.generoService.getGenero().subscribe(res => this.generos = res);
    this.autorService.getAutor().subscribe(res => this.autores = res);
  }

  onFilterGenero(event: MultiSelectChangeEvent) {
    this.selectedGeneros = event.value;
    this.filterItems();
  }

  onSearchTextChange() {
    this.filterItems();
  }
  onFilterAutor(event: MultiSelectChangeEvent) {
    this.selectedAutores = event.value;
    this.filterItems();
  }
  onFilterEditorial(event: MultiSelectChangeEvent) {
    this.selectedEditorial = event.value;
    this.filterItems();
  }
  filterItems() {
    let filtered = this.libros;

    if (this.selectedGeneros.length > 0) {
      const selectedGeneroIds = this.selectedGeneros.map(g => g.id);
      filtered = filtered.filter(libro =>
        libro.generos.some(g => selectedGeneroIds.includes(g.id))
      );
    }

    if (this.selectedAutores.length > 0) {
      const selectedAutorIds = this.selectedAutores.map(a => a.id);
      filtered = filtered.filter(libro =>
        libro.autores.some(g => selectedAutorIds.includes(g.id))
      );
    }

    if (this.selectedEditorial.length > 0) {
      const selectedEditorialIds = this.selectedEditorial.map(a => a.id);
      filtered = filtered.filter(libro =>
        selectedEditorialIds.includes(libro.editorial.id)
      );
    }

    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filtered = filtered.filter(libro =>
        libro.titulo.toLowerCase().includes(searchTextLower)
      );
    }

    this.filteredItems = filtered;
  }
}
