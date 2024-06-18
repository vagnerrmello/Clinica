// EditPaciente.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useNavigate, useParams } from 'react-router-dom';

const EditPaciente: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [telefone, setTelefone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPaciente();
  }, [id]);

  const fetchPaciente = async () => {
    try {
      
      const response = await axios.get(`${api.defaults.baseURL}/Paciente/${id}`);
      const paciente = response.data;
      console.log(paciente);
      setNome(paciente.nome);
      setDataNascimento(paciente.dataNascimento.split('T')[0]);
      setTelefone(paciente.telefone);
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
    }
  };

  const handleUpdatePaciente = async () => {
    try {
      
      const response = await axios.put(`${api.defaults.baseURL}/Paciente/atualizar`, {
        id,
        nome,
        dataNascimento,
        telefone,
      });

      if (response.status === 200) {
        alert('Paciente atualizado com sucesso!');
        navigate('/pacientes');
      } else {
        alert('Erro ao atualizar paciente');
      }
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      alert('Erro ao atualizar paciente');
    }
  };

  return (
    <div className="create-container">
      <div className="form-wrapper">
      <h1>Editar Paciente</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdatePaciente(); }}>
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
        <button type="submit">Atualizar Paciente</button>
      </form>
    </div>
    </div>
  );
};

export default EditPaciente;
