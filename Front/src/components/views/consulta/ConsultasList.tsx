// ConsultasList.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useNavigate } from 'react-router-dom'; 
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import './ConsultasList.css'; 

interface Consulta {
  id: string;
  dataHoraInicio: string;
  medico: {
    nome: string;
    especialidade: string;
  };
  paciente: {
    nome: string;
    telefone: string;
  };
  status: string;
}

const ConsultasList: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filtroMedicoID, setFiltroMedicoID] = useState<string>('');
  const [filtroTelefonePaciente, setFiltroTelefonePaciente] = useState<string>('');
  const [filtroStatus, setFiltroStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchConsultas();
  }, []);

  const fetchConsultas = async () => {
    setLoading(true);
    try {
      
      const response = await axios.get<Consulta[]>(`${api.defaults.baseURL}/Agenda/consultas`, {
        params: {
          medicoID: filtroMedicoID || undefined,
          telefonePaciente: filtroTelefonePaciente || undefined,
          status: filtroStatus || undefined,
        },
      });
      setConsultas(response.data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarConsulta = async (consultaId: string) => {
    try {
      
      await axios.put(`${api.defaults.baseURL}/Agenda/cancelar`, JSON.stringify(consultaId), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      fetchConsultas();
      alert('Consulta cancelada com sucesso!');
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      alert('Erro ao cancelar consulta');
    }
  };

  const handleCriarConsulta = () => {
    navigate('/schedule'); 
  };

  const handleEditarConsulta = (consultaId: string) => {
    navigate(`/edit-consulta/${consultaId}`);
  };

  return (
    <div>
      <h1>Listagem de Consultas</h1>
      <div className="criar-consulta-button">
          <button className="criar-consulta-button" onClick={handleCriarConsulta}>Criar consulta</button>
      </div>

      <div className="filters">
        {/* <input
          type="text"
          placeholder="Filtrar por Médico"
          value={filtroMedicoID}
          onChange={(e) => setFiltroMedicoID(e.target.value)}
        /> */}
        <input
          type="text"
          placeholder="Filtrar por Telefone do Paciente"
          value={filtroTelefonePaciente}
          onChange={(e) => setFiltroTelefonePaciente(e.target.value)}
        />
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="Pendente">Pendente</option>
          <option value="Confirmado">Confirmado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        <button onClick={fetchConsultas}>Filtrar</button>
      </div>
      {loading ? (
        <p>Carregando consultas...</p>
      ) : (
<table className="consultas-table">
          <thead>
            <tr>
              <th>Data/Hora Início</th>
              <th>Médico</th>
              <th>Especialidade</th>
              <th>Paciente</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((consulta) => (
              <tr key={consulta.id}>
                <td>{format(new Date(consulta.dataHoraInicio), 'dd-MM-yyyy / HH:mm')}</td>
                <td>{consulta.medico.nome}</td>
                <td>{consulta.medico.especialidade}</td>
                <td>{consulta.paciente.nome}</td>
                <td>{consulta.paciente.telefone}</td>
                <td>{consulta.status}</td>
                <td>
            {consulta.status === 'Pendente' && (
              <>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="cancelar-consulta-icon"
                  onClick={() => handleCancelarConsulta(consulta.id)}
                  title="Consulta será cancelada"
                />
                 <span className="icon-separator"></span>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="editar-consulta-icon"
                  onClick={() => handleEditarConsulta(consulta.id)}
                  title="Editar consulta"
                />
              </>
            )}
          </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsultasList;
