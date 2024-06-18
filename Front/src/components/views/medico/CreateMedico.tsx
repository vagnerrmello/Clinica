// CreateMedico.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useNavigate } from 'react-router-dom';

const CreateMedico: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newMedico = {
        nome: nome,
        email: email,
        senha: senha,
        especialidade: especialidade,
      };
      
      const response = await axios.post(`${api.defaults.baseURL}/Medico/criar`, newMedico, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Médico criado com sucesso!');
        navigate('/medicos');
      } else {
        alert('Erro ao criar médico');
      }
    } catch (error) {
      console.error('Erro ao criar médico:', error);
      alert('Erro ao criar médico');
    }
  };

  return (
    <div className="create-container">
      <div className="form-wrapper">
      <h1>Criar Novo Médico</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
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

        <div>
          <label>Especialidade:</label>
          <input
            type="text"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
          />
        </div>
        <button type="submit">Criar Médico</button>
      </form>
    </div>
    </div>
  );
};

export default CreateMedico;
