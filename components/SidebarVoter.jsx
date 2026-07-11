"use client";

import { useState, useEffect,useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "../app/css/Sidebar.css";

export default function SidebarVoter() {
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Support dropdown state
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);

  const navLinks = [
  { 
    href: "/VoterPanel/DashboardVoter", 
    label: "Dashboard", 
    icon: <Home size={18} /> 
  },
   { 
    href: "/VoterPanel/CastVote2", 
    label: "Cast Vote", 
    icon: <Home size={18} /> 
  },
];

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 1024;

      setIsMobile(mobile);

      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
        document.body.style.overflow = "";
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isSidebarOpen]);

 const previousPathRef = useRef(pathname);

useEffect(() => {
  const previousPath = previousPathRef.current;

  const enteredSupportPage =
    previousPath !== pathname &&
    (
      pathname === "/SupportPortal" ||
      pathname === "/SupportResponsePortal"
    );

  if (enteredSupportPage) {
    queueMicrotask(() => {
      setIsSupportDropdownOpen(true);
    });
  }

  previousPathRef.current = pathname;
}, [pathname]);
  const isDropdownOpen = isSupportDropdownOpen;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      {isMobile && (
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={toggleSidebar}
          aria-label="Open navigation menu"
          style={{ display: isSidebarOpen ? "none" : "flex" }}
        >
          <Menu size={20} color="white" />
        </button>
      )}

      {/* Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="sidebar-overlay active"
          onClick={closeSidebar}
          role="presentation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${
          isSidebarOpen ? "open" : "collapsed"
        } ${isMobile ? "mobile" : ""}`}
      >
        <div className="sidebar-header">
          {isSidebarOpen && (
            <div className="brand-container">
              <div>
                <h2 className="brand-text">Hisab-ul-Khair</h2>
                <p className="user-info">Voter Panel</p>
              </div>
            </div>
          )}

          {isMobile && isSidebarOpen && (
            <button
              type="button"
              className="toggle-btn"
              onClick={toggleSidebar}
              aria-label="Close sidebar menu"
            >
              <X size={20} />
            </button>
          )}

          {!isMobile && !isSidebarOpen && (
            <button
              type="button"
              className="toggle-btn expand-btn"
              onClick={toggleSidebar}
              aria-label="Expand sidebar menu"
            >
              <Menu size={16} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navLinks.map((link, index) => {
            if (link.isDropdown) {
              const isChildActive = link.subItems.some(
                (sub) => pathname === sub.href
              );

              return (
                <div
                  key={`dropdown-${index}`}
                  className="menu-item dropdown-container"
                >
                  <button
                    type="button"
                    className={`menu-link dropdown-toggle-btn ${
                      isChildActive ? "active" : ""
                    }`}
                    onClick={() => {
                      if (!isSidebarOpen) {
                        setIsSidebarOpen(true);
                      }

                      setIsSupportDropdownOpen((prev) => !prev);
                    }}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span className="nav-icon">{link.icon}</span>

                    {isSidebarOpen && (
                      <>
                        <span
                          className="nav-label"
                          style={{ flexGrow: 1 }}
                        >
                          {link.label}
                        </span>

                        <span className="dropdown-chevron">
                          {isDropdownOpen ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </span>
                      </>
                    )}
                  </button>

                  {isSidebarOpen && isDropdownOpen && (
                    <div
                      className="dropdown-sub-menu"
                      style={{
                        paddingLeft: "16px",
                        marginTop: "4px",
                      }}
                    >
                      {link.subItems.map((subItem) => {
                        const isSubActive =
                          pathname === subItem.href;

                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`menu-link sub-menu-link ${
                              isSubActive ? "active" : ""
                            }`}
                            onClick={closeSidebar}
                            aria-current={
                              isSubActive ? "page" : undefined
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "2px",
                            }}
                          >
                            <span
                              className="nav-icon"
                              style={{ marginRight: "8px" }}
                            >
                              {subItem.icon}
                            </span>

                            <span className="nav-label">
                              {subItem.label}
                            </span>

                            {isSubActive && (
                              <span className="active-indicator"></span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === link.href;

            return (
              <div key={link.href} className="menu-item">
                <Link
                  href={link.href}
                  className={`menu-link ${isActive ? "active" : ""}`}
                  onClick={closeSidebar}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="nav-icon">{link.icon}</span>

                  {isSidebarOpen && (
                    <span className="nav-label">
                      {link.label}
                    </span>
                  )}

                  {isActive && isSidebarOpen && (
                    <span className="active-indicator"></span>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}