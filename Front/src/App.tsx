import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Sidebar from './Sidebar';
import Welcome from './components/views/Welcome';
import UserList from './UserList';
import ScheduleAppointment from './components/views/consulta/ScheduleAppointment';
import ConsultasList from './components/views/consulta/ConsultasList';
import EditConsulta from './components/views/consulta/EditConsulta';
import ConsultasListaSemSidebar from './components/views/consulta/ConsultasListaSemSidebar';
import UsuariosList from './components/views/user/UsuariosList'; 
import CreateUser from './components/views/user/CreateUser';
import EditedUser from './components/views/user/EditedUser';
import PacientesList from './components/views/paciente/PacientesList';
import AddPaciente from './components/views/paciente/AddPaciente';
import EditPaciente from './components/views/paciente/EditPaciente';
import MedicosList from './components/views/medico/MedicosList';
import CreateMedico from './components/views/medico/CreateMedico';
import EditMedico from './components/views/medico/EditMedico';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);

  const handleLogin = (usuario: any) => {
    setIsLoggedIn(true);
    setUsuario(usuario);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsuario(null);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && window.location.pathname !== '/consultasmedico' && <Sidebar usuario={usuario} onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {isLoggedIn ? (
              <>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/schedule" element={<ScheduleAppointment />} />
                <Route path="/consultas" element={<ConsultasList />} />
                <Route path="/edit-consulta/:id" element={<EditConsulta />} />
                <Route path="/consultasmedico" element={<ConsultasListaSemSidebar />} />
                <Route path="/" element={<Navigate to="/welcome" />} />
                <Route path="/users" element={<UsuariosList />} />
                <Route path="/create-user" element={<CreateUser />} />	
                <Route path="/edit-user/:id" element={<EditedUser />} />
                <Route path="/pacientes" element={<PacientesList />} />
                <Route path="/add-paciente" element={<AddPaciente />} />
                <Route path="/edit-paciente/:id" element={<EditPaciente />} />
                <Route path="/medicos" element={<MedicosList />} />
                <Route path="/create-medico" element={<CreateMedico />} />
                <Route path="/EditMedico/:id" element={<EditMedico />} />
              </>
            ) : (
              <Route path="/" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
