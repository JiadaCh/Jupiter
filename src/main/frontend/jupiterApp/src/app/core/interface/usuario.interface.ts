export interface Usuario {
  id: number;
  correo: string;
  nombre: string;
  rol: string;
  direccion?: string;
  contrasena: string;
  imagen: string;
}
