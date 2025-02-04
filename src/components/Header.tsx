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
      <div className="header-container">
        <WidgetsIcon onClick={toggleModal} className="menu-icon" />
      </div>

      {/* Menu en dialogue modal */}
      <Dialog open={isModalOpen} onClose={toggleModal} fullScreen>
        <div className="modal-header">
          <h2>Menu</h2>
          <IconButton onClick={toggleModal} className="close-btn">
            <CloseIcon />
          </IconButton>
        </div>

        <DialogContent className="menu-content">
          <List>
            <nav>
              <ul className="menu-list">
                <li><Link to="/" onClick={toggleModal}>Accueil</Link></li>
                <li><Link to="/bars" onClick={toggleModal}>Les bars</Link></li>
                <li><Link to="/events" onClick={toggleModal}>Les events</Link></li>
                <li><Link to="/bar-form" onClick={toggleModal}>Ajouter un bar</Link></li>
                <li><Link to="/event-form" onClick={toggleModal}>Ajouter un event</Link></li>
                <li><Link to="/about" onClick={toggleModal}>A propos</Link></li>
                <li><Link to="/dashboard" onClick={toggleModal}>Dashboard</Link></li>
                {isConnected ? (
                  <li><Link to="/profil" onClick={toggleModal}>Profil</Link></li>
                ) : (
                  <li><Link to="/login" onClick={toggleModal}>Connexion</Link></li>
                )}
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
