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
  useEffect(() => {
    if (user) {
      const ws = new WebSocket("ws://localhost:8000/ws");

      ws.onopen = () => {
        console.log("WebSocket connection established");
        ws.send(JSON.stringify({ type: "USER_CONNECTED", userId: user.id }));
      };

      ws.onmessage = (event) => {
        console.log("Received message:", event.data);
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
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
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
