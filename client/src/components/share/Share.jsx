import "./share.scss";
import {
  PersonAddOutlined,
  AddPhotoAlternateOutlined,
  AddLocationAltOutlined,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { publicRequest } from "../../requestMethod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import upload from "../../upload";

function Share() {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  // ADD Post
  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = await upload(file);
      await publicRequest.post("post/create", { desc, img: imgUrl });
      toast.success("Success ADD Post !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setDesc("");
      setFile(null);
    } catch (error) {
      console.log(error.message);
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={
                currentUser.profilePicture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU"
              }
              alt=""
            />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.username}?`}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>

        <hr />

        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <AddPhotoAlternateOutlined />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <AddLocationAltOutlined />
              <span>Add Place</span>
            </div>
            <div className="item">
              <PersonAddOutlined />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleAddPost}>Share</button>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1300} />
    </div>
  );
}

export default Share;
