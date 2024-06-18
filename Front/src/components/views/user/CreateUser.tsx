import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

interface Perfil {
  perfilID: string;
  nome: string;
}

const CreateUser: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfilID, setPerfilID] = useState('');
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfis = async () => {
      try {
        
        const response = await axios.get<Perfil[]>(`${api.defaults.baseURL}/Perfil/perfis`);
        setPerfis(response.data);
      } catch (error) {
        console.error('Erro ao buscar perfis:', error);
      }
    };

    fetchPerfis();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const usuario = {
        nome: nome,
        email: email,
        senha: senha,
        perfilID: perfilID,
        perfil: perfis.find(p => p.perfilID === perfilID) // Inclui o perfil completo
      };
      
      await axios.post(`${api.defaults.baseURL}/User`, usuario, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Usuário criado com sucesso!');
      navigate('/users');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário');
    }
  };

  return (
    <div className="create-container">
      <div className="form-wrapper">
      <h1>Novo Usuário</h1>
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
        <button type="submit" className="submit-button">Criar usuário</button>
      </form>
      </div>
    </div>
  );
};

export default CreateUser;
