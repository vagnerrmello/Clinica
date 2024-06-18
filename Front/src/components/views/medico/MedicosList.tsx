// MedicosList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { buildUrl } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import './MedicosList.css'; 

interface Medico {
  medicoID: string;
  nome: string;
  especialidade: string;
}

const MedicosList: React.FC = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicos();
  }, []);

  const fetchMedicos = async () => {
    setLoading(true);
    try {
      
      const response = await axios.get<Medico[]>(`${api.defaults.baseURL}/Medico/medicos`);
      setMedicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarUsuario = () => {
    navigate('/create-medico');
  };

  const handleEditarMedico = (consultaId: string) => {
    navigate(`/EditMedico/${consultaId}`);
  };

  return (
    <div>
      <h1>Listagem de Médicos</h1>
      <div className="criar-usuario-button-container">
        <button className="criar-usuario-button" onClick={handleCriarUsuario}>
          Criar Médico
        </button>
      </div>

      {loading ? (
        <p>Carregando médicos...</p>
      ) : (
        <table className="medicos-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Especialidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((medico) => (
              <tr key={medico.medicoID}>
                <td>{medico.nome}</td>
                <td>{medico.especialidade}</td>
                <td>
                    <>

                    <span className="icon-separator"></span>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="editar-consulta-icon"
                      onClick={() => handleEditarMedico(medico.medicoID)}
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

export default MedicosList;
