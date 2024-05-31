import {Usuario} from "@interface/usuario.interface";

export interface Producto {
  id:          number;
  nombre: string;
  descripcion: string;
  precio:      number;
  imagen:      string;
  comprado:      boolean;
}

