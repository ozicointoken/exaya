export interface IUsuario {
  id: number;
  createdAt: string;
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  email: string;
  password: string;
  sede: "Lima" | "Ayacucho" | "Huancayo" | "Selva Central";
  rol: "usuario" | "administrador" | "supervisor";
  activo: boolean;
  updatedAt: string;
}

export interface IPersona {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string | null;
}
