import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { buildUrl } from './api';
import './styles.css';

interface LoginProps {
  onLogin: (usuario: any) => void; 
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [isMedico, setIsMedico] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      
      const response = await api.post('/User/login', { email, senha, isMedico });
      const { data } = response;
      
      const { redirectUrl, usuario } = response.data;
      localStorage.setItem('usuario', JSON.stringify(usuario));

      if (data.redirectUrl) {
        onLogin(data.usuario); 
        navigate(data.redirectUrl);
      } else {
        setError('Dados não conferem. Por gentileza revisar seus dados.');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setError('Erro ao tentar fazer login');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>

        <div>
        <label>
            <input
              type="checkbox"
              checked={isMedico}
              onChange={(e) => setIsMedico(e.target.checked)}
            />
            
          </label>
        </div>
        <div>
        Médico
        </div>
      </div>

        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
