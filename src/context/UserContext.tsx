import { notification } from "antd";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface User {
  id?: string;
  email: string;
  name?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const connectWebSocket = (user: User) => {
    const ws = new WebSocket(import.meta.env.VITE_API_WS_URL);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      ws.send(JSON.stringify({ type: "USER_CONNECTED", userId: user.id }));
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      notification.open({
        message: "New Notification",
        description: event.data,
      });
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  };
  useEffect(() => {
    if (user) {
      if (socket) {
        socket.close();
        setSocket(null);
      }
      const cleanup = connectWebSocket(user);
      return cleanup;
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const newUser = { email };
      setUser(newUser);
      if (socket) {
        socket.close();
        setSocket(null);
      }
      connectWebSocket(newUser);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, socket, setSocket }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
