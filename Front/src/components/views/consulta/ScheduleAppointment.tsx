import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import api, { buildUrl } from '../../../api';
import { useNavigate } from 'react-router-dom';
import './ScheduleAppointment.css';

interface Medico {
  medicoID: string;
  nome: string;
}

interface Paciente {
  id: string;
  nome: string;
}

const ScheduleAppointment: React.FC = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [selectedMedicoID, setSelectedMedicoID] = useState<string>('');
  const [selectedPacienteID, setSelectedPacienteID] = useState<string>('');
  const [dataHoraInicio, setDataHoraInicio] = useState<string>('');
  const navigate = useNavigate();
  const status = 'Pendente';

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const dataHoraFim = getCurrentDateTime();

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        
        const response = await axios.get<Medico[]>(`${api.defaults.baseURL}/User/medicos`);
        setMedicos(response.data);
      } catch (error) {
        console.error('Erro ao buscar médicos:', error);
      }
    };

    const fetchPacientes = async () => {
      try {
        
        const response = await axios.get<Paciente[]>(`${api.defaults.baseURL}/User/pacientes`);
        setPacientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchMedicos();
    fetchPacientes();
  }, []);

  const isTimeWithinWorkingHours = (dateTime: string) => {
    const selectedTime = new Date(dateTime);
    const startOfDay = new Date(selectedTime);
    startOfDay.setHours(8, 0, 0, 0);
    const endOfDay = new Date(selectedTime);
    endOfDay.setHours(17, 0, 0, 0);

    return selectedTime >= startOfDay && selectedTime <= endOfDay;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isTimeWithinWorkingHours(dataHoraInicio)) {
      alert('O horário selecionado deve estar entre 8:00 e 17:00.');
      return;
    }

    const consulta = {
      medicoID: selectedMedicoID,
      pacienteID: selectedPacienteID,
      dataHoraInicio,
      dataHoraFim,
      status
    };

    try {
      
      await axios.post(`${api.defaults.baseURL}/Agenda/agendamentos`, consulta);
      alert('Agendamento criado com sucesso!');
      navigate('/consultas');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao criar agendamento:', error.response?.data || error.message);
      } else {
        console.error('Erro ao criar agendamento:', error);
      }
      alert('Erro ao criar agendamento');
    }
  };

  return (
     <div className="schedule-container">
      <div className="form-wrapper">
        <h1>Consultas</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Médico:</label>
            <select value={selectedMedicoID} onChange={(e) => setSelectedMedicoID(e.target.value)} required>
              <option value="">Selecione um médico</option>
              {medicos.map((medico) => (
                <option key={medico.medicoID} value={medico.medicoID}>
                  {medico.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Paciente:</label>
            <select value={selectedPacienteID} onChange={(e) => setSelectedPacienteID(e.target.value)} required>
              <option value="">Selecione um paciente</option>
              {pacientes.map((paciente) => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Data e Hora de Início:</label>
            <input
              type="datetime-local"
              value={dataHoraInicio}
              onChange={(e) => setDataHoraInicio(e.target.value)}
              required
            />
          </div>
          <button type="submit">Criar Consulta</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
