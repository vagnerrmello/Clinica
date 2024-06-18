import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useParams, useNavigate } from 'react-router-dom';
import './EditConsulta.css';  // Importe o arquivo CSS para estilização

const EditConsulta: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState<any>(null);
  const [dataHoraInicio, setDataHoraInicio] = useState<string>('');

  useEffect(() => {
    const fetchConsulta = async () => {
      try {
        
        const response = await axios.get(`${api.defaults.baseURL}/Agenda/consulta/${id}`);
        const data = response.data;
        setConsulta(data);
        setDataHoraInicio(new Date(data.dataHoraInicio).toISOString().slice(0, 16));
      } catch (error) {
        console.error('Erro ao buscar consulta:', error);
      }
    };

    fetchConsulta();
  }, [id]);

  const handleUpdateConsulta = async () => {
    try {
      const updatedConsulta = {
        ...consulta,
        dataHoraInicio: new Date(dataHoraInicio).toISOString(),
      };

      await axios.put(`${api.defaults.baseURL}/Agenda/agendamentos`, updatedConsulta);
      alert('Consulta atualizada com sucesso!');
      navigate('/consultas');
    } catch (error) {
      console.error('Erro ao atualizar consulta:', error);
      alert('Erro ao atualizar consulta');
    }
  };

  if (!consulta) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="schedule-container">
      <div className="form-wrapper">
      <h1>Editar Consulta</h1>
      <form className="edit-consulta-form">
        <div className="edit-consulta-field">
          <label>Data/Hora Início</label>
          <input
            type="datetime-local"
            value={dataHoraInicio}
            onChange={(e) => setDataHoraInicio(e.target.value)}
          />
        </div>
        <div className="edit-consulta-field disabled">
          <label>Nome do Médico</label>
          <input
            type="text"
            value={consulta.medico.nome}
            disabled
          />
        </div>
        <div className="edit-consulta-field disabled">
          <label>Nome do Paciente</label>
          <input
            type="text"
            value={consulta.paciente.nome}
            disabled
          />
        </div>
        <button type="button" onClick={handleUpdateConsulta}>Salvar</button>
      </form>
    </div>
    </div>
  );
};

export default EditConsulta;
