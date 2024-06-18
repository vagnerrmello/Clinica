import React, { useEffect, useState } from 'react';
import api, { buildUrl } from '../../api';
import BarChart from './BarChart';
import PieChart from './PieChart';

interface ConsultaPorEspecialidade {
  especialidade: string;
  totalConsultas: number;
}

interface MedicoConsultas {
  nome: string;
  totalConsultas: number;
}

const Welcome: React.FC = () => {
  const [consultasPorEspecialidade, setConsultasPorEspecialidade] = useState<ConsultaPorEspecialidade[]>([]);
  const [consultasPorMedico, setConsultasPorMedico] = useState<MedicoConsultas[]>([]);

  useEffect(() => {
    const fetchConsultasPorEspecialidade = async () => {
      try {
        
        //const url = buildUrl('Agenda', 'consultas-por-especialidade');
        
        const response = await api.get(`${api.defaults.baseURL}/Agenda/consultas-por-especialidade`);
        setConsultasPorEspecialidade(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados de consultas por especialidade:', error);
      }
    };

    const fetchConsultasPorMedico = async () => {
      try {
        const response = await api.get(`${api.defaults.baseURL}/Agenda/consultas-por-medico`);
        setConsultasPorMedico(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados de consultas por médico:', error);
      }
    };

    fetchConsultasPorEspecialidade();
    fetchConsultasPorMedico();
  }, []);

  return (
    <div>
      <h1>Bem-vindo ao Sistema!</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
        <div>
          <h2>Consultas por Especialidade</h2>
          {consultasPorEspecialidade.length > 0 ? (
            <BarChart data={consultasPorEspecialidade} />
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
        <div>
          <h2>Consultas por Médico</h2>
          {consultasPorMedico.length > 0 ? (
            <PieChart data={consultasPorMedico} />
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
