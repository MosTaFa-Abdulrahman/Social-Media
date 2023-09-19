import "./post.scss";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  TextsmsOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Comments from "../comments/Comments";
import useFetch from "../../hooks/useFetch";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { publicRequest } from "../../requestMethod";

// From Posts Page
function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [openComments, setOpenComments] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useFetch(`user/get/${post.userId}`);
  const { data: commentData } = useFetch(`comment/get/${post._id}`);

  // Like Functionlity
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  const likeHandler = () => {
    try {
      publicRequest.put(`post/likedis/${post._id}`);
    } catch (error) {
      console.log(error.message);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // Delete Post
  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      publicRequest.delete(`post/delete/${post._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                data.profilePic ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAYFBMVEX///8WFhgAAAD6+voRERQKCg2VlZUxMTH19fXp6equrq4YGBrt7e1vb3BjY2NeXl/IyMnV1dWHh4cmJidLS0siIiKoqKm7u7sAAAefn592dnc8PD3c3N3Ozs9BQUJPT1EZXiuCAAAEuUlEQVRoge1a6dKqMAyFtGUTBXFhE3n/t7y0gNhVCvg5c4fzy8GWQ5YmTVrH2bFjx44dO3bs2GEFNPPZV7jDvMyOpyRJTseszMO/4UWpdwWKoiCEFAX7ffXSL7Oj9OgCEOzywATAPX6RPPR8AJH1xQ7ge+F3eLMbkDchX3ipgMAt2547KC+DuLgzrX+tyihP0zSPyuraaaIY/oNLGWxL3DwHXgJuez/zbw/O99Yd9IHh2WxJnA3v7bw4ipUj4qjz+OHbss14Qx8G3uphGPaoBm7wN7J22gtMoPr0wrAah6arWbslGvUWnme/zh96a0frI2rJiAl4wYxXISfwmNgYypW8AzH4CoGDOI4VS6hhXrGamqn6AK1oYXT2TvXtcKtP3llURdjCYVD4cqTMapAgXtMoqmnoouiCWR3xfzoo6aetcLOwlzgRv+fyCqND0BQ5kl7q5YvLJ0xi4WkmZQ0sBQ8mNfGXEmd0OrSCHY+gyFRw5Aehls1dGM2a/rsFlVUq4o6k4oeFvb4WxfDgSRRucqcWVOAAd34gc07yXJK5SqYvj3/4MOwMhJjusfkLVnV8wYpvVhpZbWqmM3xRpzYTevcS7PTQE3eDBaGbZU4W3rDsNjr3UjsZG41vtou6t5IwK/CJgZn4gmlClad8AqIckhBnk8jd+LMwngpNfLtsydaEaLguf5iZxRzB3MIyfFMfJlfxqfeBWVLslcg+bwZysUKE3t8NzJIfUyVh10bdKZshLUVr5phJYKNuqtailbY/ttpGTltYejezz116bOthNMyr/EUPRKMzEdeI/arqZtAICvMNTVcDFuOCQyOJLl9QaGdIq1OPXKcju+hJweyWz2amCVL5nsbIrNoG0G+1SJWZdnhiyJLifm0SYn6+OhZKR3WMaVJtTbocivlR7KQ3Tqmj1qiUucxpNnNC9JFn5g5wBI2GRGkHa2ak2fVq1uyGzFRqeaevkdia2WBniugGeNr7HjDc9MWbpZ31vt0j8IqhGUUrusIzbKotfVu/nl/IsycGAPzMzAHKcj1rYxhFes97GafKPcjvOq+wjGHauN1Xzl3F/K7fYHim9G7LuK3MVfTF6ZVVzgTqrInpAxQ3WT08u6aO1JaxzVWa/IyyqfEJcGlPx1N7mXqwBDJJbNv8rN6TBDUXQzApioJvOEMterntnkSxD0NO6BaakD2hcEN+kvU+TLH3fLimymYEcbmCyH7vKe+34/qzxEzq+v177ffbco1hKJx5cCWFfY0h1VX3ucScZy6pq4RaklXTM/FWMS+pJYX62bjnlIQeP3hR/cz3DIxNCgX1Y/pe+54B1yf5UMlJzH1uWtgn4XpD2laUGhjopMW9obd+WG4n8pCcFvfDxh5gY+lfjLkae5eLeoBT31M6h/wETFb1PV+93lDT6tTjAOGqXu/Q3y6MTTA1iF+4a/rbfU/ftdW1y+YcVvX0h3OMhVh3XBZZLuU3qded3YznVUuINzoq+3titEzhm5xLvs5iLbDFWSzDeP48F5udPzvTmfs8gbc7c3fe7hl8wtb3DN7vVph5N79b4fD3SXR6/sZ9Esb9ozs0FL+6NzSQ/+Su1Mj+k/thv70Tt2PHjh07duzY8d/gH2D/OUg0jRqsAAAAAElFTkSuQmCC"
              }
              alt=""
            />
            <div className="details">
              <NavLink to={`/profile/${data.username}`} className="link">
                <span className="name">{data.username}</span>
              </NavLink>
              <span className="date">{format(post.createdAt)}</span>
            </div>
          </div>

          {currentUser.username === data.username && (
            <DeleteIcon
              style={{ color: "red", cursor: "pointer" }}
              onClick={handleDeletePost}
            />
          )}
        </div>

        <div className="content">
          <p>{post.desc}</p>
          <img src={post?.img} alt="" />
        </div>

        <div className="info">
          <div className="item">
            {isLiked ? (
              <FavoriteOutlined
                style={{ color: "red" }}
                onClick={likeHandler}
              />
            ) : (
              <FavoriteBorderOutlined onClick={likeHandler} />
            )}
            {like} Likes
          </div>

          <div className="item" onClick={() => setOpenComments(!openComments)}>
            <TextsmsOutlined />
            {commentData.length} Comments
          </div>
          <div className="item">
            <ShareOutlined />
            Share
          </div>
        </div>

        {openComments && (
          <Comments
            comments={commentData}
            postId={post._id}
            // *** //
            user={data}
            // *** //
            key={commentData._id}
          />
        )}
      </div>
    </div>
  );
}

export default Post;
