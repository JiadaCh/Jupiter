import {Editorial} from "./editorial.interface";
import {Genero} from "./genero.interface";
import {Autor} from "./autor.interface";

export interface LibroPag {
  total: number;
  pages: number;
  currentPage: number;
  libros: Libro[];
}

export interface Libro {
  id: number;
  titulo: string;
  sinopsis: string;
  idioma: string;
  portada?: string;
  editorial: Editorial;
  numPag: number;
  anoPublicacion: number;
  isbn?: string;
  generos: Genero[];
  autores: Autor[];
}
