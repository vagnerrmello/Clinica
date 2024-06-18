// src/PacientesList.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import './PacientesList.css';

interface Paciente {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string;
}

const PacientesList: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    setLoading(true);
    try {
      
      const response = await axios.get<Paciente[]>(`${api.defaults.baseURL}/Paciente/pacientes`);
      setPacientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarConsulta = () => {
    navigate('/add-paciente'); 
  };

  const handleEditPaciente = (id: string) => {
    navigate(`/edit-paciente/${id}`);
  };

  return (
    <div>
      <h1>Pacientes</h1>
      <div className="criar-consulta-button">
          <button className="criar-consulta-button" onClick={handleCriarConsulta}>Novo paciente</button>
      </div>

      {loading ? (
        <p>Carregando pacientes...</p>
      ) : (
        <table className="pacientes-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.nome}</td>
                <td>{new Date(paciente.dataNascimento).toLocaleDateString()}</td>
                <td>{paciente.telefone}</td>
                <td>
                <>
                    <span className="icon-separator"></span>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="editar-consulta-icon"
                      onClick={() => handleEditPaciente(paciente.id)}
                      title="Editar consulta"
                    />
                    </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PacientesList;
