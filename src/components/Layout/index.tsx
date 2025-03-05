import React, { ReactNode } from "react";
import { useUser } from "../../context/UserContext";

import { Button, Input } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userServices } from "../../services";
interface LayoutProps {
  children: ReactNode; // Define the type for the children prop
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const onLogout = () => {
    userServices.logout();
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
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
              <Button type="primary">Share a movie</Button>
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
              />
              <Input
                type="password"
                placeholder="password"
                style={{
                  border: "2px solid #ccc",
                  padding: "8px 12px",
                  borderRadius: "8px",
                }}
              />
              <Button type="primary">Login / Register</Button>
            </>
          )}
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 p-4 bg-gray-100">
        {children} {/* This will render the page content */}
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-4">
        <p>&copy; 2025 Funny Movies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
