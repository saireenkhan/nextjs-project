"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, RefreshCw } from "lucide-react";
import logo from "@/public/assets/isl-logo-removebg-preview.png"
import "./css/login.css";

export default function Home() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");

  const [captchaCode, setCaptchaCode] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = [
    "Admin",
    "Imam panel",
    "Committee member",
    "Voter Panel",
    "Viewer Panel",
    "Accounts Panel",
    "Moazzin Panel",
    "Muqtadi Panel",
  ];


  /* =========================================================
     CAPTCHA GENERATOR
     ========================================================= */

  const generateCaptcha = () => {
    const characters =
      "0123456789";

    let newCaptcha = "";

    for (let i = 0; i < 7; i++) {
      newCaptcha +=
        characters.charAt(
          Math.floor(
            Math.random() *
              characters.length
          )
        );
    }

    setCaptchaCode(newCaptcha);

    setCaptcha("");
  };


  /* =========================================================
     GENERATE CAPTCHA ON PAGE LOAD
     ========================================================= */

  useEffect(() => {
    generateCaptcha();
  }, []);


  /* =========================================================
     ROLE SELECT
     ========================================================= */

  const handleRoleSelect = (role) => {
    setSelectedRole(role);

    setIsOpen(false);
  };


  /* =========================================================
     LOGIN
     ========================================================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);


    /* EMAIL + PASSWORD */

    if (!email || !password) {
      setError(
        "Please enter both email and password."
      );

      setLoading(false);

      return;
    }


    /* CAPTCHA */

    if (!captcha) {
      setError(
        "Please enter the captcha."
      );

      setLoading(false);

      return;
    }


    /* CAPTCHA VALIDATION */

    if (captcha !== captchaCode) {
      setError(
        "Invalid captcha. Please try again."
      );

      generateCaptcha();

      setLoading(false);

      return;
    }


    try {

      console.log(
        "Attempting to connect to backend..."
      );


      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );


      console.log(
        "Response received:",
        response.status
      );


      const data =
        await response.json();


      console.log(
        "Login response:",
        data
      );


      if (data.success) {

        localStorage.setItem(
          "authToken",
          data.data.token
        );


        localStorage.setItem(
          "refreshToken",
          data.data.refreshToken
        );


        localStorage.setItem(
          "userData",
          JSON.stringify(
            data.data.user
          )
        );


        const roleRoutes = {

          Admin:
            "/AdminPanel/Dashboard",

          Imam:
            "/ImamPanel/DashboardImam",

          "Committee Member":
            "/CommittePanel/DashboardCommittee",

          Voter:
            "/VoterPanel/DashboardVoter",

          Viewer:
            "/ViewerPanel/DashboardViewer",

          Accounts:
            "/AccountsPanel/DashboardAccounts",

          Moazzin:
            "/MoazzinPanel/DashboardMoazzinPanel",

          Muqtadi:
            "/MuqtadiPanel/DashboardMuqtadi",
        };


        const userRole =
          data.data.user.role;


        const redirectPath =
          roleRoutes[userRole] || "/";


        router.push(
          redirectPath
        );

      } else {

        setError(
          data.error ||
            "Login failed. Please try again."
        );

        generateCaptcha();
      }

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setError(
        "Unable to connect to server. Make sure backend is running on port 5000."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="edu-page-container">


      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="edu-header">

        <div className="edu-brand">

          <h1 className="app-title">
            Hisab-ul-Khair
          </h1>

          <span className="tagline">
            Financial & Management Portal
          </span>

        </div>


        {/* ROLE DROPDOWN */}

        <div className="admin-dropdown">

          <button
            type="button"
            className="dropdown-btn"
            onClick={() =>
              setIsOpen(!isOpen)
            }
          >

            <span className="user-icon">
              <User size={16} />
            </span>

            <span>
              {selectedRole}
            </span>

            <span
              className={`arrow ${
                isOpen
                  ? "up"
                  : ""
              }`}
            >
              ⌄
            </span>

          </button>


          {isOpen && (
            <ul className="dropdown-menu">

              {roles.map((role) => (

                <li
                  key={role}
                  onClick={() =>
                    handleRoleSelect(
                      role
                    )
                  }
                  className={
                    selectedRole === role
                      ? "active"
                      : ""
                  }
                >
                  {role}
                </li>

              ))}

            </ul>
          )}

        </div>

      </header>


      {/* =====================================================
          MAIN LOGIN CONTENT
          ===================================================== */}

      <main className="edu-main-content">

        <div className="login-card">


          {/* LOGO + TITLE */}

          <div className="login-intro">

            <img
              src={logo.src}
              alt="Islamic Center Logo"
            />


            <h2>
              Login to Your Account
            </h2>


            <p>
              Welcome back! Please enter
              your details below.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          {/* LOGIN FORM */}

          <form
            className="edu-form"
            onSubmit={handleLogin}
          >


            {/* EMAIL */}

            <div className="input-group">

              <input
                type="email"
                placeholder="Enter your Email"
                className="edu-input"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <input
                type="password"
                placeholder="Enter your Password"
                className="edu-input"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>


            {/* REMEMBER / FORGOT */}

            <div className="form-aux">

              <label className="remember-me">

                <input
                  type="checkbox"
                />

                <span>
                  Keep Me Logged In
                </span>

              </label>


              <a
                href="#"
                className="forgot-link"
              >
                Forgot Password?
              </a>

            </div>


            {/* CAPTCHA */}

            <div className="captcha-container">

              <div className="captcha-header">

                <span>
                  Security Verification
                </span>


                <button
                  type="button"
                  className="captcha-refresh"
                  onClick={
                    generateCaptcha
                  }
                  title="Generate new captcha"
                >

                  <RefreshCw
                    size={15}
                  />

                </button>

              </div>


              <div className="captcha-box">

                <span className="captcha-code">
                  {captchaCode}
                </span>

              </div>


              <input
                type="text"
                placeholder="Enter the captcha above"
                className="edu-input captcha-input"
                value={captcha}
                onChange={(e) =>
                  setCaptcha(
                    e.target.value
                  )
                }
                required
              />

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >

              {loading
                ? "Logging in..."
                : "Log in"}

            </button>

          </form>

        </div>

      </main>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="login-footer">

        <p>
          © 2027 Islamic Center.
          All Rights Reserved.
        </p>

        <p>
          Powered by{" "}
          <strong>
            Islamic Center
          </strong>
        </p>

      </footer>

    </div>
  );
}