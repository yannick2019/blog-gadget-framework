import { api } from "../api";
import { useFindMany } from "@gadgetinc/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { BeatLoader } from "react-spinners";

export default function () {

  // Get all posts order by date creation
  const [result, refresh] = useFindMany(api.post, {
    sort: { createdAt: "Descending" },
  });
  const { data: posts, fetching } = result;

  // Get last post
  const [{ data: lastPost, error }] = useFindMany(api.post, {
    live: true,
    first: 1,
    sort: { createdAt: "Descending" },
  });

  // Get four last posts 
  const [{ data: lastPostTitles }] = useFindMany(api.post, {
    live: true,
    first: 4,
    sort: { createdAt: "Descending" },
  });

  useEffect(() => {
    document.title = `Articles | ${process.env.GADGET_PUBLIC_APP_SLUG}`;
  }, []);

  if (!posts || !lastPost) return <div className="loader"><BeatLoader color="#2e86de" /></div>;

  return (
    <>
      {!error && !fetching ? (
        <div className="articles-page-container">
          <div>
            <div className="sidebar">
              <Link to={`/category/Tech`} className="category-link">Tech</Link>
              <Link to={`/category/Finance`} className="category-link">Finance</Link>
              <Link to={`/category/Sport`} className="category-link">Sport</Link>
              <Link to={`/category/Health`} className="category-link">Health</Link>
              <Link to={`/category/Events`} className="category-link">Events</Link>
            </div>
          </div>
          <div>
            <div className="hero-container">
              {lastPost.map((post) => (
                <Link to={`/single-post/${post.id}`} className="hero-card-one" style={{ textDecoration: "none" }} key={post.id}>
                  <div>
                    <p style={{ color: "#2e86de" }}>{post.category}</p>
                    <h1>{post.title}</h1>
                  </div>
                  <div>
                    <p>{post.body.slice(0, 100)}</p>
                  </div>
                  <div>
                    <img src={post.image?.url} alt="post image" style={{ maxHeight: "460px" }} />
                  </div>
                </Link>
              ))}
              <div className="hero-card-two">
                {lastPostTitles?.map((post) => (
                  <Link to={`/single-post/${post.id}`} key={post.id} style={{ textDecoration: "none" }}>
                    <p style={{ color: "#2e86de" }}>{post.category}</p>
                    <h2>{post.title}</h2>
                    <hr />
                  </Link>
                ))}
              </div>
            </div>
            <div className="main-contaniner">
              <h2 style={{ marginTop: "20px", marginBottom: "20px", fontSize: "30px", color: "#2e86de" }}>The latest</h2>
              <hr />
              {posts?.map((post) => (
                <Link to={`/single-post/${post.id}`} key={post.id} style={{ textDecoration: "none" }}>
                  <div className="post-card">
                    <div className="post-card-content">
                      <p style={{ color: "#2e86de" }}>{post.category}</p>
                      <h2>{post.title}</h2>
                    </div>
                    <div className="post-card-content post-card-body">
                      <p>{post.body.slice(0, 200)}</p>
                    </div>
                    <div className="post-card-content">
                      <img src={post.image?.url} alt="post image" style={{ maxHeight: "366px" }} />
                    </div>
                  </div>
                  <hr />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>Something went wrong! Try later</div>
        </>
      )
      }
    </>
  );
}
