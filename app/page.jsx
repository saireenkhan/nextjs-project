"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import "./css/login.css";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Admin');
  const router = useRouter();

  const roles = ['Admin', 'Imam panel', 'Committee member', 'Voter Panel', 'Viewer Panel', 'Accounts Panel','Moazzin Panel','Muqtadi Panel'];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsOpen(false);

    if (role === 'Admin') {
      router.push('./AdminPanel/Dashboard');
    } else if (role === 'Imam panel') {
      router.push('/ImamPanel/DashboardImam');
    } else if (role === 'Committee member') {
      router.push('/CommittePanel/DashboardCommittee');
    }
    else if (role === 'Voter Panel') {
      router.push('/VoterPanel/DashboardVoter');
    }
    else if (role === 'Viewer Panel') {
      router.push('/ViewerPanel/DashboardViewer');
    }
    else if (role === 'Accounts Panel') {
      router.push('/AccountsPanel/DashboardAccounts');
    }
        else if (role === 'Moazzin Panel') {
      router.push('/MoazzinPanel/DashboardMoazzinPanel');
    }
            else if (role === 'Muqtadi Panel') {
      router.push('/MuqtadiPanel/DashboardMuqtadi');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedRole === 'Admin') {
      router.push('./AdminPanel/Dashboard');
    } else if (selectedRole === 'Imam panel') {
      router.push('/ImamPanel/DashboardImam');
    } else if (selectedRole === 'Committee member') {
      router.push('/CommittePanel/DashboardCommittee');
    }
    else if (selectedRole === 'Voter Panel') {
      router.push('/VoterPanel/DashboardVoter');
    }
    else if (selectedRole === 'Viewer Panel') {
      router.push('/ViewerPanel/DashboardViewer');
    }
    else if (selectedRole === 'Accounts Panel') {
      router.push('/AccountsPanel/DashboardAccounts');
    }
        else if (selectedRole === 'Moazzin Panel') {
      router.push('/MoazzinPanel/DashboardMoazzinPanel');
    }
            else if (role === 'Muqtadi Panel') {
      router.push('/MuqtadiPanel/DashboardMuqtadi');
    }
  };

  return (
    <div className="edu-page-container">
      <header className="edu-header">
        <div className="edu-brand">
          <h1 className="app-title">Hisab-ul-Khair</h1>
          <span className="tagline">Financial & Management Portal</span>
        </div>

        <div className="admin-dropdown">
          <button className="dropdown-btn" type="button" onClick={() => setIsOpen(!isOpen)}>
            <span className="user-icon">
              <User size={16} />
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
        <div className="login-card">
          <div className="login-intro">
            <h2>Login to Your Account</h2>
            <p>Welcome back! Please enter your details below.</p>
          </div>

          <form className="edu-form" onSubmit={handleLogin}>
            <div className="input-group">
              <input type="email" placeholder="Enter your Email" className="edu-input" required />
            </div>

            <div className="input-group">
              <input type="password" placeholder="Enter your Password" className="edu-input" required />
            </div>

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
              <input type="text" placeholder="Type the Captcha text above" className="edu-input captcha-input" required />
            </div>

            <button type="submit" className="login-btn">Log in</button>
          </form>
        </div>
      </main>
    </div>
  );
}