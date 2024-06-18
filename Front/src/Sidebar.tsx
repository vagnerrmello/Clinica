import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faUsers, faCalendarAlt, faUserFriends, faStethoscope  } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

interface SidebarProps {
  usuario: any;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ usuario, onLogout }) => {
  const perfil = usuario?.perfil?.nome;
  const nomeUsuario = usuario?.nome;
  return (

    
    <div className="sidebar">

      <div className="menu-item">
      <p>Olá, {nomeUsuario}!</p>
      <p>Seu perfil: {perfil}</p>
      </div>

      <div className="menu-item logout">
        <Link to="/login" className="menu-link" onClick={onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          Logout
        </Link>
      </div>
      <div className="menu-item">
        <Link to="/welcome" className="menu-link">
          <FontAwesomeIcon icon={faHome} className="icon" />
          Welcome
        </Link>
      </div>
      {(perfil === 'Administrador') && (
        <div className="menu-item">
          <Link to="/users" className="menu-link">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            Usuários
          </Link>
        </div>
      )}
        <div className="menu-item">
          <Link to="/medicos" className="menu-link">
            <FontAwesomeIcon icon={faStethoscope} className="icon" />
            Médicos
          </Link>
        </div>

        <div className="menu-item">
          <Link to="/consultas" className="menu-link">
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
            Consultas
          </Link>
        </div>
      
      {(perfil === 'Administrador' || perfil === 'Atendente') && (
        <div className="menu-item">
          <Link to="/pacientes" className="menu-link">
            <FontAwesomeIcon icon={faUserFriends} className="icon" />
            Pacientes
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
