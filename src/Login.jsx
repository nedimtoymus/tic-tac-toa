import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // CSS dosyasını ekleyin

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleLogin = () => {
    if (username.trim() !== '') {
      onLogin(username);
      navigate('/game-list');
    } else {
      alert('Lütfen kullanıcı adını giriniz.');
    }
  };

  return (
    <div className="container">
      <div className="background-animation" />
      <div className="card-login">
        <h1>Login Page</h1>
        <div className="container-input">
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div className="buttons-login">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
