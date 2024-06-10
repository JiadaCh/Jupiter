import {Usuario} from "./usuario.interface";

export interface Resena {
  id:           number;
  calificacion: number;
  texto:        string;
  usuario:      Usuario;
}
