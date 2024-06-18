// src/UserList.tsx
import React, { useEffect, useState } from 'react';
import api from './api';
import { Usuario } from './types';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<Usuario[]>('/User');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Nome: {user.nome}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
