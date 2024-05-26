import {Producto} from "./producto.interface";
import {Usuario} from "./usuario.interface";

export interface Pedido {
  id:        number;
  precio:    number;
  estado:    string;
  fecha:     string;
  vendedor:  Usuario;
  comprador: Usuario;
  producto:  Producto;
}
