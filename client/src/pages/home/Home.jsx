import "./home.scss";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import Stories from "../../components/stories/Stories";

function Home() {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
}

export default Home;
