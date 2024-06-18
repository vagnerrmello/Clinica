import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useNavigate, useParams } from 'react-router-dom';

const EditMedico: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedico();
  }, [id]);

  const fetchMedico = async () => {
    try {
      const response = await axios.get(`${api.defaults.baseURL}/Medico/${id}`);
      const medico = response.data;
      setNome(medico.nome);
      setEmail(medico.email);
      setSenha(medico.senha);
      setEspecialidade(medico.especialidade || '');
    } catch (error) {
      console.error('Erro ao buscar médico:', error);
    }
  };

  const handleUpdateMedico = async () => {
    try {
      const response = await axios.put(`${api.defaults.baseURL}/Medico/${id}`, {
        medicoID: id,
        nome,
        email: email,
        senha: senha,
        especialidade,
      });

      if (response.status === 200) {
        alert('Médico atualizado com sucesso!');
        navigate('/medicos');
      } else {
        alert('Erro ao atualizar médico');
      }
    } catch (error) {
      console.error('Erro ao atualizar médico:', error);
      alert('Erro ao atualizar médico');
    }
  };

  return (
    <div className="create-container">
      <div className="form-wrapper">
      <h1>Editar Médico</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdateMedico(); }}>
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
        <button type="submit">Atualizar Médico</button>
      </form>
    </div>
    </div>
  );
};

export default EditMedico;
