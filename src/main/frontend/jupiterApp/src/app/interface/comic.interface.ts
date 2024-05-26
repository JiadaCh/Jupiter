import {Editorial} from "./editorial.interface";
import {Genero} from "./genero.interface";
import {Autor} from "./autor.interface";

export interface Comic {
  id:             number;
  titulo:         string;
  sinopsis:       string;
  idioma:         string;
  editorial:      Editorial;
  portada:        string;
  tipo?:          TipoComic;
  anoPublicacion: number;
  generos:         Genero[];
  autores:          Autor[];
}

export enum TipoComic{
  Manga ="Manga",
  Americano = "Cómics Americano",
  Manhwa = "Manhwa",
  Manhua = "Manhua",
  Otros = "0tros"
}
