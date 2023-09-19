import "./update.scss";
import { useState } from "react";
import { publicRequest } from "../../requestMethod";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import upload from "../../upload";

// From Profile Page
function Update({ setOpen, user }) {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let profileUrl;
      let coverUrl;

      profileUrl = profile ? await upload(profile) : user?.profilePicture;
      coverUrl = cover ? await upload(cover) : user?.coverPicture;

      await publicRequest.put(`user/update/${user._id}`, {
        texts,
        profilePicture: profileUrl,
        coverPicture: coverUrl,
      });

      toast.success("Success Updated User !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setOpen(false);
      setCover(null);
      setProfile(null);
    } catch (error) {
      console.log(error.message);
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile ? URL.createObjectURL(profile) : user.profilePicture
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={cover ? URL.createObjectURL(cover) : user.coverPicture}
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>

          <label>Username</label>
          <input
            type="text"
            value={texts.username}
            name="username"
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>

        <button className="close" onClick={() => setOpen(false)}>
          X
        </button>
      </div>

      <ToastContainer autoClose={1300} />
    </div>
  );
}

export default Update;
