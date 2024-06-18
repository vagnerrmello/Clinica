// ConsultasListaSemSidebar.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useNavigate } from 'react-router-dom'; 
import './ConsultasListaSemSidebar.css';

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

interface Usuario {
  nome: string;
  email: string;
  senha: string;
  id: string;
}

const ConsultasListaSemSidebar: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filtroMedicoID, setFiltroMedicoID] = useState<string>('');
  const [filtroTelefonePaciente, setFiltroTelefonePaciente] = useState<string>('');
  const [filtroStatus, setFiltroStatus] = useState<string>('');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Recuperar usuário do localStorage
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      setUsuario(JSON.parse(storedUsuario));
    }
  }, []);

  useEffect(() => {
    if (usuario) {
      fetchConsultas();
    }
  }, [usuario]);

  const fetchConsultas = async () => {
    try {
      console.log("USUÁRIO");
      console.log(usuario);
      const response = await axios.get<Consulta[]>(`${api.defaults.baseURL}/Agenda/consultas`, {
        params: {
          medicoID: usuario?.id || undefined,
          telefonePaciente: filtroTelefonePaciente || undefined,
          status: filtroStatus || undefined,
        },
      });
      setConsultas(response.data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  };

  const handleCancelarConsulta = async (consultaId: string) => {
    try {
      
      await axios.put(`${api.defaults.baseURL}/Agenda/cancelar`, null, {
        params: { consultaId }
      });
      // Atualizar a lista após cancelar a consulta
      fetchConsultas();
      alert('Consulta cancelada com sucesso!');
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      alert('Erro ao cancelar consulta');
    }
  };

  const handleStatusChange = async (consultaId: string, novoStatus: string) => {
    try {
      
      await axios.put(`${api.defaults.baseURL}/Agenda/StatusDaConsulta`, null, {
        params: {
          consultaId,
          novoStatus
        }
      });
      // Atualizar a lista após alterar o status da consulta
      fetchConsultas();
      alert(`Status da consulta ${consultaId} alterado para ${novoStatus} com sucesso!`);
    } catch (error) {
      console.error('Erro ao alterar status da consulta:', error);
      alert('Erro ao alterar status da consulta');
    }
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    // Exemplo: Limpar tokens de autenticação, etc.
    navigate('/login'); // Redirecionar para a tela de login após logout
  };

  return (
    <div className="consultas-list-container">
      <h1>Área exclusiva</h1>
      <p>Médico: {usuario?.nome}</p>
      <div className="medico-button-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <span className="login-link" onClick={() => navigate('/login')}></span>
      </div>

      <div className="filters">
        <button >Consultas</button>
      </div>
      <table className="consultas-table">
        <thead>
          <tr>
            <th>Data/Hora Início</th>
            <th>Médico</th>
            <th>Especialidade</th>
            <th>Paciente</th>
            <th>Telefone</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.id}>
              <td>{new Date(consulta.dataHoraInicio).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
              <td>{consulta.medico.nome}</td>
              <td>{consulta.medico.especialidade}</td>
              <td>{consulta.paciente.nome}</td>
              <td>{consulta.paciente.telefone}</td>
              <td>{consulta.status}</td>
              <td>
              {(consulta.status === 'Pendente' || consulta.status === 'Em andamento') && (
                  <>
                    <select
                      value={consulta.status}
                      onChange={(e) => handleStatusChange(consulta.id, e.target.value)}
                    >
                      <option value="Pendente" disabled>Pendente</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Concluída">Concluída</option>
                    </select>
                    
                  </>
                )}
                {/* Adicione aqui o botão de Editar se necessário */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultasListaSemSidebar;
