import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {ComicService} from "../../core/service/comic.service";
import {Comic} from "../../core/interface/comic.interface";
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

@Component({
  selector: 'app-comics',
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
  templateUrl: './comics.component.html',
  styles: ``
})
export class ComicsComponent implements OnInit {
  rows: number = 12;
  layout: "grid" | "list" = 'grid';
  generos: Genero[] = [];
  autores: Autor[] = [];
  comics: Comic[] = [];
  editoriales: Editorial[] = [];
  tipoComics: any[] = ['Manga', 'Cómics Americano', 'Manhwa', 'Manhua', 'Otros'];
  filteredItems: Comic[] = [];
  selectedAutores: Autor[] = [];
  selectedGeneros: Genero[] = [];
  selectedEditorial: Editorial[] = [];
  selectedTipo: string = '';
  searchText: string = '';
  private comicService = inject(ComicService);
  private generoService = inject(GeneroService);
  private autorService = inject(AutorService);
  private editorialService = inject(EditorialService);

  ngOnInit(): void {
    this.comicService.getComic().subscribe(res => {
      this.comics = res
      this.filterItems();
    });
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

  onFilterTipo(event: MultiSelectChangeEvent) {
    this.selectedTipo = event.value;
    this.filterItems();
  }

  onFilterEditorial(event: MultiSelectChangeEvent) {
    this.selectedEditorial = event.value;
    this.filterItems();
  }

  filterItems() {
    let filtered = this.comics;

    if (this.selectedGeneros.length > 0) {
      const selectedGeneroIds = this.selectedGeneros.map(g => g.id);
      filtered = filtered.filter(comic =>
        comic.generos.some(g => selectedGeneroIds.includes(g.id))
      );
    }

    if (this.selectedAutores.length > 0) {
      const selectedAutorIds = this.selectedAutores.map(a => a.id);
      filtered = filtered.filter(comic =>
        comic.autores.some(g => selectedAutorIds.includes(g.id))
      );
    }
    if (this.selectedEditorial.length > 0) {
      const selectedEditorialIds = this.selectedEditorial.map(a => a.id);
      filtered = filtered.filter(comic =>
        selectedEditorialIds.includes(comic.editorial.id)
      );
    }
    if (this.selectedTipo) {

      const selectedTipo = this.selectedTipo;
      console.log(this.selectedTipo);
      filtered = filtered.filter(comic =>
        selectedTipo == comic.tipo
      );
    }


    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filtered = filtered.filter(comic =>
        comic.titulo.toLowerCase().includes(searchTextLower)
      );
    }

    this.filteredItems = filtered;
  }
}
