import "./posts.scss";
import Post from "../post/Post";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// From Profile Page
function Posts({ username }) {
  const { currentUser } = useContext(AuthContext);

  const { data } = useFetch(
    username ? `post/profile/${username}` : `post/timeline/${currentUser._id}`
  );

  return (
    <div className="posts">
      {data.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}

export default Posts;
