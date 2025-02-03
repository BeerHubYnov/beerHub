import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Dialog, DialogContent, IconButton, List } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WidgetsIcon from "@mui/icons-material/Widgets";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsConnected(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Icône pour ouvrir le menu */}
      <WidgetsIcon onClick={toggleModal} style={{ cursor: "pointer" }} />

      {/* Menu en dialogue modal */}
      <Dialog open={isModalOpen} onClose={toggleModal} fullScreen>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", background: "white", color: "#fff" }}>
          <h2>Menu</h2>
          <IconButton onClick={toggleModal} style={{ color: "#fff" }}>
            <CloseIcon style={{ color: "black" }}/>
          </IconButton>
        </div>

        <DialogContent>
          <List style={{ textAlign: "center" }}>
            <nav>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li><Link to="/" onClick={toggleModal}>Home</Link></li>
                <li><Link to="/bars" onClick={toggleModal}>Bars</Link></li>
                <li><Link to="/bar-form" onClick={toggleModal}>Add a bar</Link></li>
                <li><Link to="/about" onClick={toggleModal}>About</Link></li>
                <li><Link to="/dashboard" onClick={toggleModal}>Dashboard</Link></li>
                {isConnected ? (
                  <li><Link to="/profil" onClick={toggleModal}>Profil</Link></li>
                ) : (
                  <li><Link to="/login" onClick={toggleModal}>Login</Link></li>
                )}
                <li><Link to="*" onClick={toggleModal}>Nothing Here</Link></li>
              </ul>
            </nav>
          </List>
        </DialogContent>
      </Dialog>

      <Outlet />
    </>
  );
};

export default Header;
