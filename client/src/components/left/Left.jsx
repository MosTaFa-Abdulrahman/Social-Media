import "./left.scss";
import {
  Diversity1,
  Groups3,
  Storefront,
  Storage,
  MusicVideo,
  Event,
  SportsEsports,
  Collections,
  SlowMotionVideo,
  Message,
  Public,
  SupervisedUserCircle,
  Bookmark,
  Login,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Left() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="section">
          {currentUser ? (
            <NavLink to={`/profile/${currentUser.username}`} className="link">
              <div className="user">
                <img
                  src={
                    currentUser?.profilePicture ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU"
                  }
                  alt=""
                />
                <span>{currentUser.username}</span>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login" className="link">
              <div className="item">
                <Login className="icon" />
                <span>Login</span>
              </div>
            </NavLink>
          )}

          <div className="item">
            <Diversity1 className="icon" />
            <span>Friends</span>
          </div>
          <div className="item">
            <Groups3 className="icon" />
            <span>Groups</span>
          </div>
          <div className="item">
            <Storefront className="icon" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <MusicVideo className="icon" />
            <span>MusicVideo</span>
          </div>
          <div className="item">
            <Storage className="icon" />
            <span>Storages</span>
          </div>
        </div>

        <hr />

        <div className="section">
          <span className="secTwoTit">Tools</span>
          <div className="item">
            <Event className="icon" />
            <span>Event</span>
          </div>
          <div className="item">
            <SportsEsports className="icon" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <Collections className="icon" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <SlowMotionVideo className="icon" />
            <span>Videos</span>
          </div>
          <div className="item">
            <Message className="icon" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="section">
          <span className="secThreeTit">Others</span>
          <div className="item">
            <Public className="icon" />
            <span>Countries</span>
          </div>
          <div className="item">
            <SupervisedUserCircle className="icon" />
            <span>Users</span>
          </div>
          <div className="item">
            <Bookmark className="icon" />
            <span>Saved</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Left;
