export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  comprado: boolean;
}

export interface ProductoPag{
  total:number;
  pages:number;
  currentPage:number;
  productos: Producto[];
}
