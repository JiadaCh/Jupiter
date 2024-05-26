import {Editorial} from "./editorial.interface";
import {Genero} from "@interface/genero.interface";
import {Autor} from "@interface/autor.interface";

export interface Libro {
  id:             number;
  titulo:         string;
  sinopsis:       string;
  idioma:         string;
  portada?:        string;
  editorial?:        Editorial;
  numPag:         number;
  anoPublicacion: number;
  isbn?:           string;
  generos:         Genero[];
  autores:          Autor[];
}
