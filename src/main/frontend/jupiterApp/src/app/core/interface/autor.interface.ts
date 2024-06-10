export interface Autor {
  id: number;
  nombre: string;
  apellido1: string;
  apellido2?: string;
}

export enum Rol {
  admin = "admin",
  usuario = "usuario",
}
