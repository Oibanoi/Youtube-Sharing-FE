import React, { ReactNode, useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { Button, Input } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userServices } from "../../services";
import { userHooks } from "../../hooks";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { login, loading } = userHooks.useUserHook();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onLogout = () => {
    setUser(null);
    userServices.logout();
    navigate("/");
  };

  const onLogin = () => {
    login(email, password).then(() => {
      navigate("/");
    });
  };

  const shareMovie = () => {
    navigate("/share");
  };

  const onRegister = () => {
    navigate("/register");
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <HomeFilled className="logo-icon" />
            <span className="logo-text">Funny Movies</span>
          </div>
          <div className="auth-container">
            {user ? (
              <>
                <span className="welcome-text">Welcome {user.email}</span>
                <Button type="primary" onClick={shareMovie}>
                  Share a movie
                </Button>
                <Button danger onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <div className="auth-container-item">
                  <Input
                    placeholder="Email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="auth-container-item">
                  <Button type="primary" onClick={onLogin} loading={loading}>
                    Login
                  </Button>
                  <Button type="primary" onClick={onRegister}>
                    Register
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className={`main-content ${isMobile ? "mobile-content" : ""}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
