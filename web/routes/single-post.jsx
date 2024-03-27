import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { api } from "../api";
import { useFindOne, useFindFirst } from "@gadgetinc/react";
import { BeatLoader } from "react-spinners";

const SinglePostPage = () => {
  let { postId } = useParams();

  const [{ data: post, error, fetching }] = useFindOne(api.post, postId);

  useEffect(() => {
    document.title = `${post?.title} | ${process.env.GADGET_PUBLIC_APP_SLUG}`;
  }, [post]);

  if (!post || fetching) return <div className="loader"><BeatLoader color="#2e86de" /></div>;

  return (
    <>
      {!error && !fetching ? (
        <div className="single-post-page-container">
          <div className="sidebar">
            <Link to={`/category/Tech`} className="category-link">Tech</Link>
            <Link to={`/category/Finance`} className="category-link">Finance</Link>
            <Link to={`/category/Sport`} className="category-link">Sport</Link>
            <Link to={`/category/Health`} className="category-link">Health</Link>
          </div>
          <div className="single-post-main">
            <p style={{ color: "#2e86de" }}>{post.category}</p>
            <h1>{post.title}</h1>
            <img src={post.image?.url} alt="post image" />
            <div>
              {post.body}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Error: Something went wrong! Try later</h1>
        </div>
      )}
    </>
  )
}

export default SinglePostPage;