// UsuariosList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import './UsuariosList.css';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: {
    nome: string;
  };
}

const UsuariosList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      
      const response = await axios.get<Usuario[]>(`${api.defaults.baseURL}/User/usuarios`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarUsuario = () => {
    navigate('/create-user');
  };

  const handleEditarUsuario = (id: string) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div>
      <h1>Usuários</h1>
      <div className="criar-usuario-button-container">
        <button className="criar-usuario-button" onClick={handleCriarUsuario}>
          Criar usuário
        </button>
      </div>
      {loading ? (
        <p>Carregando usuários...</p>
      ) : (
        <table className="consultas-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.perfil.nome}</td>
                <td>
                <>
                    <span className="icon-separator"></span>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="editar-consulta-icon"
                      onClick={() => handleEditarUsuario(usuario.id)}
                      title="Editar consulta"
                    />
                    </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsuariosList;
