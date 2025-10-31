// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message, type = 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    setCurrentView('welcome');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setCurrentView('login');
    showNotification('You have been logged out successfully!', 'success');
  };

  if (isLoggedIn && currentView === 'welcome') {
    return <Welcome username={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="app-container">
      {/* Notification System */}
      {notification.show && (
  <div className="modal-overlay">
    <div className={`modal-dialog ${notification.type}`}>
      <div className="modal-icon">
        {notification.type === 'success' ? '✓' : '⚠'}
      </div>
      <div className="modal-text">
        <h3>{notification.type === 'success' ? 'Success' : 'Error'}</h3>
        <p>{notification.message}</p>
      </div>
      <button 
        className="modal-close-btn"
        onClick={() => setNotification({ show: false, message: '', type: '' })}
      >
        ×
      </button>
    </div>
  </div>
)}

      <div className="auth-container">
        <div className="auth-header">
          <h1>Event Planner</h1>
          <p>Manage your events effortlessly</p>
        </div>
        
        <div className="auth-tabs">
          <button 
            className={`tab-button ${currentView === 'login' ? 'active' : ''}`}
            onClick={() => setCurrentView('login')}
          >
            Login
          </button>
          <button 
            className={`tab-button ${currentView === 'register' ? 'active' : ''}`}
            onClick={() => setCurrentView('register')}
          >
            Register
          </button>
        </div>
        
        <div className="auth-content">
          {currentView === 'login' ? 
            <Login 
              onLoginSuccess={handleLoginSuccess} 
              onSwitchToRegister={() => setCurrentView('register')}
              onShowNotification={showNotification}
            /> : 
            <Register 
              onRegisterSuccess={() => {
                setCurrentView('login');
                showNotification('Registration successful! Please login.', 'success');
              }} 
              onSwitchToLogin={() => setCurrentView('login')}
              onShowNotification={showNotification}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default App;