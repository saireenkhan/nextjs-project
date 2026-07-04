"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react'; // Clean professional User icon
import "./css/login.css"; 

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Installer Portal ');
  const router = useRouter();

  const roles = ['Installer Portal ', 'Support Panel', 'Admin Panel'];

  // Static assets pointing to public/assets/
  const img1 = "/assets/illustration.png";
  const powerLogo = "/assets/power-logo.png";

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsOpen(false);

    if (role === 'Installer Portal ') {
      router.push('/Dashboard'); // Remember to keep this lowercase if you renamed your folder!
    } else if (role === 'Support Panel') {
      router.push('/dashboard'); 
    } else if (role === 'Admin Panel') {
      router.push('/dashboard3');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedRole === 'Installer Portal ') {
      router.push('/Dashboard'); 
    } else if (selectedRole === 'Teacher Panel') {
      router.push('/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="edu-page-container">
      <header className="edu-header">
        <div className="edu-brand">
          <img src={powerLogo} alt="Power Logo" />
        </div>

        <div className="admin-dropdown">
          <button className="dropdown-btn" type="button" onClick={() => setIsOpen(!isOpen)}>
            {/* Swapped emoji for Lucide User icon */}
            <span className="user-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <User size={16} style={{ marginRight: '6px' }} />
            </span>
            {selectedRole}
            <span className={`arrow ${isOpen ? 'up' : ''}`}>⌄</span>
          </button>

          {isOpen && (
            <ul className="dropdown-menu">
              {roles.map((role) => (
                <li 
                  key={role} 
                  onClick={() => handleRoleSelect(role)}
                  className={selectedRole === role ? 'active' : ''}
                >
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <main className="edu-main-content">
        <div className="login-column">
          <div className="login-intro">
            <h2>Login your Account</h2>
            <p>Welcome back! Select method to login:</p>
          </div>

          <form className="edu-form" onSubmit={handleLogin}>
            <input type="email" placeholder="Enter your Email" className="edu-input" required />
            <input type="password" placeholder="Enter your Password" className="edu-input" required />
            
            <div className="form-aux">
              <label className="remember-me">
                <input type="checkbox" /> Keep Me Logged In
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <div className="captcha-container">
              <div className="captcha-box">
                <span className="captcha-code">5412345</span>
              </div>
              <input type="text" placeholder="Type the Text" className="edu-input captcha-input" />
            </div>

            <button type="submit" className="login-btn">Log in</button>
          </form>
        </div>

        <div className="illustration-column">
          <img src={img1} alt="Illustration" className="main-illustration" />
        </div>
      </main>
    </div>
  );
}