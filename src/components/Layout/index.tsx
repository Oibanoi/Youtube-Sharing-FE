import React, { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext";

import { Button, Input } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userServices } from "../../services";
import { userHooks } from "../../hooks";
interface LayoutProps {
  children: ReactNode; // Define the type for the children prop
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { login, loading } = userHooks.useUserHook();
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
    <div
      style={{
        width: "99vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 162px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <HomeFilled style={{ fontSize: "32px" }} />
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Funny Movies
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {user ? (
              <>
                <span style={{ color: "#555", fontSize: "14px" }}>
                  Welcome {user.email}
                </span>
                <Button type="primary" onClick={shareMovie}>
                  Share a movie
                </Button>
                <Button danger onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Input
                  placeholder="email"
                  style={{
                    border: "2px solid #ccc",
                    padding: "8px 12px",
                    borderRadius: "8px",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="password"
                  style={{
                    border: "2px solid #ccc",
                    padding: "8px 12px",
                    borderRadius: "8px",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="primary" onClick={onLogin} loading={loading}>
                  Login
                </Button>
                <Button type="primary" onClick={onRegister}>
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "16px",
          height: "100%",
          alignItems: "center",
        }}
        className="flex-1 p-4 bg-gray-100"
      >
        {children} {/* This will render the page content */}
      </main>
    </div>
  );
};

export default Layout;
