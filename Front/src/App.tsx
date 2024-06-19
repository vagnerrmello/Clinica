// App.tsx
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
import PrivateRoute from './PrivateRoute';

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
            <Route path="/" element={isLoggedIn ? <Navigate to="/welcome" /> : <Navigate to="/login" />} />
            <Route path="/welcome" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<Welcome />} />} />
            <Route path="/schedule" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<ScheduleAppointment />} />} />
            <Route path="/consultas" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<ConsultasList />} />} />
            <Route path="/edit-consulta/:id" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<EditConsulta />} />} />
            <Route path="/consultasmedico" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<ConsultasListaSemSidebar />} />} />
            <Route path="/users" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<UsuariosList />} />} />
            <Route path="/create-user" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<CreateUser />} />} />
            <Route path="/edit-user/:id" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<EditedUser />} />} />
            <Route path="/pacientes" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<PacientesList />} />} />
            <Route path="/add-paciente" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<AddPaciente />} />} />
            <Route path="/edit-paciente/:id" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<EditPaciente />} />} />
            <Route path="/medicos" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<MedicosList />} />} />
            <Route path="/create-medico" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<CreateMedico />} />} />
            <Route path="/edit-medico/:id" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<EditMedico />} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
