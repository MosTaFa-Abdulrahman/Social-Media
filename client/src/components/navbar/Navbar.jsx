import "./navbar.scss";
import {
  SearchOutlined,
  HomeOutlined,
  DarkModeOutlined,
  GridViewOutlined,
  NotificationsOutlined,
  EmailOutlined,
  WbSunny,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser, dispatch } = useContext(AuthContext);

  const [mySearch, setMySearch] = useState("");

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (err) {
      toast.error(`Error Logout !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleSearch = () => {
    navigate(`profile/${mySearch}`);
  };

  return (
    <div className="navbar">
      <div className="left">
        <NavLink to="/" className="link">
          <span>Dasrhsocial</span>
        </NavLink>
        <NavLink to="/" className="link">
          <HomeOutlined />
        </NavLink>
        {darkMode ? (
          <WbSunny onClick={toggle} style={{ cursor: "pointer" }} />
        ) : (
          <DarkModeOutlined onClick={toggle} style={{ cursor: "pointer" }} />
        )}

        <GridViewOutlined />
        <div className="search">
          <SearchOutlined
            style={{ cursor: "pointer" }}
            onClick={handleSearch}
          />
          <input
            type="text"
            placeholder="Search ..."
            required
            onChange={(e) => setMySearch(e.target.value)}
          />
        </div>
      </div>

      <div className="right">
        <EmailOutlined />
        <NotificationsOutlined />
        {currentUser ? (
          <div className="user">
            <NavLink to={`/profile/${currentUser.username}`} className="link">
              <img
                src={
                  currentUser.profilePicture ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU"
                }
                alt=""
              />
            </NavLink>
            <span>{currentUser.username}</span>
            <button onClick={handleLogout}>Logout</button>
            <ToastContainer autoClose={1000} />
          </div>
        ) : (
          <NavLink to="/login" className="link">
            <button>Login</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
