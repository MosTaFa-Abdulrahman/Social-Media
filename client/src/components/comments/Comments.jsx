import "./comment.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";
import { publicRequest } from "../../requestMethod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";

/* ||The Problem in Comment Model 🧐||  */

// From Post Comp
function Comments({ comments, user, postId }) {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("comment/create", { postId, desc });
      toast.success("Success ADD Comment !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
      toast.error(`Error ADD Comment !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await publicRequest.delete(`comment/delete/${id}`);
      toast.success("Success Delete Comment !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
      toast.error(`Error Delete Comment !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser.profilePicture ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU"
          }
          alt=""
        />
        <input
          type="text"
          placeholder="write a comment"
          required
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleAddComment}>Add</button>
        <ToastContainer autoClose={1000} />
      </div>

      {comments.map((comment) => (
        <div className="comment" key={comment._id}>
          <img
            src={
              user.profilePicture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU"
            }
            alt=""
          />
          <div className="info">
            <span>{user.username}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{format(comment.createdAt)}</span>
          {comment.userId === currentUser._id && (
            <DeleteIcon
              style={{ color: "red", cursor: "pointer", fontSize: "20px" }}
              onClick={() => handleDeleteComment(comment._id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;
