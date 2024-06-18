// AddPaciente.tsx
import React, { useState } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useNavigate } from 'react-router-dom';

const AddPaciente: React.FC = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const navigate = useNavigate();

  const handleCreatePaciente = async () => {
    try {
      
      const response = await axios.post(`${api.defaults.baseURL}/Paciente/criar`, {
        nome,
        dataNascimento,
        telefone,
      });

      if (response.status === 201) {
        alert('Paciente criado com sucesso!');
        navigate('/pacientes');
      } else {
        alert('Erro ao criar paciente');
      }
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      alert('Erro ao criar paciente');
    }
  };

  return (
    <div className="create-container">
      <div className="form-wrapper">
      <h1>Adicionar Paciente</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleCreatePaciente(); }}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <button type="submit">Criar Paciente</button>
      </form>
    </div>
    </div>
  );
};

export default AddPaciente;
