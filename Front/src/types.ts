// src/types.ts
export interface Perfil {
  perfilId: string;
  nome: string;
  descricao: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  perfilId: string;
  perfil: Perfil;
}
