import React, { createContext, useState, ReactNode, useMemo } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface NotificationContextType {
  message: string | null;
  messageType: "success" | "error" | null;
  setNotification: (message: string | null, type: "success" | "error") => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [open, setOpen] = useState(false); // Pour gérer l'affichage de l'alerte

  const setNotification = (msg: string | null, type: "success" | "error" ) => {
    setMessage(msg);
    setMessageType(type);
    setOpen(true);

    if (msg) {
      setTimeout(() => {
        setOpen(false);
        setMessage(null);
        setMessageType(null);
      }, 3000);
    }
  };

  // Mémorisation de l'objet contextuel pour éviter la recréation à chaque rendu
  const contextValue = useMemo(
    () => ({ message, messageType, setNotification }),
    [message, messageType]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {message && (
          <Alert severity={messageType ?? "error"} onClose={() => setOpen(false)}>
            {message}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
};
