import { api } from "../api";
import { useFindMany } from "@gadgetinc/react";
import { useParams, Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const CategoryPage = () => {
  let { categoryName } = useParams();

  // Get all posts sort by category
  const [result, refresh] = useFindMany(api.post, {
    sort: { createdAt: "Descending" },
    filter: {
      category: { equals: categoryName }
    }
  });
  const { data: posts, error, fetching } = result;

  if (fetching) return <div className="loader"><BeatLoader color="#2e86de" /></div>;

  return (
    <div className="category-page-container">
      <div className="sidebar">
        <Link to={`/category/Tech`} className="category-link">Tech</Link>
        <Link to={`/category/Finance`} className="category-link">Finance</Link>
        <Link to={`/category/Sport`} className="category-link">Sport</Link>
        <Link to={`/category/Health`} className="category-link">Health</Link>
      </div>
      <div className="category-main">
        <h1 className="category-heading">{categoryName}</h1>
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
  )
}

export default CategoryPage;