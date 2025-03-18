import React, { createContext, useState, ReactNode } from "react";

interface NotificationContextType {
  message: string | null;
  messageType: "success" | "error" | null;
  setNotification: (message: string | null, type: "success" | "error") => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const setNotification = (msg: string | null, type: "success" | "error") => {
    setMessage(msg);
    setMessageType(type);

    if (msg) {
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000); // Cache le message après 3 secondes
    }
  };

  return (
    <NotificationContext.Provider value={{ message, messageType, setNotification }}>
      {children}
      {message && (
        <div className={`notification ${messageType === "success" ? "success" : "error"}`}>
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
