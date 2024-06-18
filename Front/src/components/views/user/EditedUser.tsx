import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useParams, useNavigate } from 'react-router-dom';
import './CreateUser.css';

interface Perfil {
  perfilID: string;
  nome: string;
}

interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  perfilID: string;
  perfil: Perfil; 
}

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfilID, setPerfilID] = useState('');
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const response = await axios.get<Usuario>(`${api.defaults.baseURL}/User/${id}`);
        const usuario = response.data;
        setNome(usuario.nome);
        setEmail(usuario.email);
        setSenha(usuario.senha);
        setPerfilID(usuario.perfilID);

        const perfisResponse = await axios.get<Perfil[]>(`${api.defaults.baseURL}/Perfil/perfis`);
        setPerfis(perfisResponse.data);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const usuario = {
        id: id,
        nome: nome,
        email: email,
        senha: senha,
        perfilID: perfilID,
        perfil: perfis.find(p => p.perfilID === perfilID) // Inclui o perfil completo
      };
      
      await axios.put(`${api.defaults.baseURL}/User/${id}`, usuario);
      alert('Usuário atualizado com sucesso!');
      navigate('/users');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário');
    }
  };

  return (
    <div className="create-container">
      <div className="form-wrapper">
        <h1>Editar Usuário</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="perfilID">Perfil:</label>
            <select
              id="perfilID"
              value={perfilID}
              onChange={(e) => setPerfilID(e.target.value)}
              required
            >
              <option value="">Selecione um perfil</option>
              {perfis.map((perfil) => (
                <option key={perfil.perfilID} value={perfil.perfilID}>
                  {perfil.nome}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">Salvar alterações</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
