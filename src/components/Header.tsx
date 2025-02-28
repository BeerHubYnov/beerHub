import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Dialog, DialogContent, IconButton, List } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Zoom, Fade, Flip, Bounce, Roll } from "react-awesome-reveal";
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from "../context/AuthContext";
const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected, logout } = useAuth();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Icône pour ouvrir le menu */}
      <div className="header-container">
        <MenuIcon onClick={toggleModal} className="menu-icon" />
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
                <Zoom>
            
                  <li>
                    <Link to="/" onClick={toggleModal}>
                      Accueil
                    </Link>
                  </li>
                </Zoom>
                <Fade>
                  <li>
                    <Link to="/bars" onClick={toggleModal}>
                      Les bars
                    </Link>
                  </li>
                </Fade>
                <Flip>
                  <li>
                    <Link to="/events" onClick={toggleModal}>
                      Les events
                    </Link>
                  </li>
                </Flip>
                <Bounce>
                  <li>
                    <Link to="/bar-form" onClick={toggleModal}>
                      Ajouter un bar
                    </Link>
                  </li>
                </Bounce>
                <Roll>
                  <li>
                    <Link to="/event-form" onClick={toggleModal}>
                      Ajouter un event
                    </Link>
                  </li>
                </Roll>
                <li>
                  <Link to="/about" onClick={toggleModal}>
                    A propos
                  </Link>
                </li>

                {isConnected ? (
                  <li>
                    <Link to="/profil" onClick={toggleModal}>
                      Profil
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/login" onClick={toggleModal}>
                      Connexion
                    </Link>
                  </li>
                )}
                {isConnected && <button onClick={logout}>Déconnexion</button>}
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
