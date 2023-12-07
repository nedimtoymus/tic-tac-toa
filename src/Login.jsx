import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Add CSS file

const Login = ({ onLogin }) => {
  // Access to navigation functionality from React Router
  const navigate = useNavigate();
  
  // State to manage the input field for username
  const [username, setUsername] = React.useState('');

  // Update the username state on input change
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  // Function to handle the login process
  const handleLogin = () => {
    // Check if the username is not empty
    if (username.trim() !== '') {
      // Trigger the onLogin function passed from the parent component (App.js)
      onLogin(username);
      // Redirect to the game list page upon successful login
      navigate('/game-list');
    } else {
      // Show an alert if the username field is empty
      alert('Please enter a username.');
    }
  };

  return (
    <div className="container">
      {/* Background animation */}
      <div className="background-animation" />
      
      {/* Login card */}
      <div className="card-login">
        <h1>Login Page</h1>
        {/* Username input field */}
        <div className="container-input">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        
        {/* Login button */}
        <div className="buttons-login">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
