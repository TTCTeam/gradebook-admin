import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logoutHandlerAction } from "../../store/auth/auth-services";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
    cName: "nav-text",
  },
  {
    title: "Admin Accounts",
    path: "/admins",
    icon: <AdminPanelSettingsIcon />,
    cName: "nav-text",
  },
  {
    title: "User Accounts",
    path: "/users",
    icon: <AccountBoxIcon />,
    cName: "nav-text",
  },
  {
    title: "Classes",
    path: "/classes",
    icon: <ClassIcon />,
    cName: "nav-text",
  },
];

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);

  const onLogoutHandler = () => {
    logoutHandlerAction(dispatch, navigate);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="navbar__title">Gradebook Admin</div>
          <AccountCircleIcon sx={{ color: "white", cursor: "pointer" }} />
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <CloseIcon sx={{ color: "white", cursor: "pointer" }} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text" onClick={onLogoutHandler}>
              <Link to=''>
                <LogoutIcon />
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
