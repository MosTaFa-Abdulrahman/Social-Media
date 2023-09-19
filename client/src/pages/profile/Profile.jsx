import "./profile.scss";
import {
  FacebookTwoTone,
  Instagram,
  Twitter,
  LinkedIn,
  MoreVert,
  EmailOutlined,
  Place,
  Language,
} from "@mui/icons-material";

import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";

import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { publicRequest } from "../../requestMethod";

function Profile() {
  const [open, setOpen] = useState(false);

  const { username } = useParams();
  const { data } = useFetch(`user/get?username=${username}`); // :id

  const { currentUser } = useContext(AuthContext); // userId

  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(data?._id));
  }, [currentUser, data._id]);

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      if (followed) {
        await publicRequest.put(`/user/${data._id}/unfollow`, {
          userId: currentUser._id,
        });
      } else {
        await publicRequest.put(`/user/${data._id}/follow`, {
          userId: currentUser._id,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    setFollowed(!followed);
  };

  return (
    <div className="profile">
      <div className="imgContainer">
        <img
          src={
            data?.coverPicture ||
            "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          className="cover"
          alt=""
        />
        <img
          src={
            data.profilePicture ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU"
          }
          className="profilePic"
          alt=""
        />
      </div>

      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
            <a href="http://facebook.com" target="_blank" rel="noreferrer">
              <FacebookTwoTone fontSize="medium" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram fontSize="medium" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <Twitter fontSize="medium" />
            </a>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedIn fontSize="medium" />
            </a>
          </div>

          <div className="center">
            <span>{data.username}</span>
            <div>
              {data.relationship === 1
                ? "Single"
                : data.relationship === 2
                ? "Married"
                : ""}
            </div>

            <div className="info">
              <div className="item">
                <Place fontSize="small" />
                <span>UK</span>
              </div>
              <div className="item">
                <Language fontSize="small" />
                <span>English</span>
              </div>
            </div>

            {currentUser.username === data.username ? (
              <button onClick={() => setOpen(true)}>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {followed ? "UnFollow" : "Follow"}
              </button>
            )}
          </div>

          <div className="right">
            <EmailOutlined />
            <MoreVert />
          </div>
        </div>
      </div>

      <Posts username={data.username} />

      {open && <Update setOpen={setOpen} user={data} />}
    </div>
  );
}

export default Profile;
