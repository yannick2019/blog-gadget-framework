import { useUser } from "@gadgetinc/react";
import { useEffect } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function () {
  const user = useUser(api);

  useEffect(() => {
    document.title = `Home | ${process.env.GADGET_PUBLIC_APP_SLUG}`;
  }, []);

  return user ? (
    <div className="signed-in-page">
      <div style={{ backgroundColor: "#ecf0f1", padding: "20px" }}>
        <h1>Welcome <span style={{ color: "#2980b9" }}>{user.firstName}</span></h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
      </div>
      <div className="signed-in-container">
        <Link to="/create-post" className="write-article link">
          <h2 style={{ color: "#2980b9" }}>Write an article</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </Link>
        <Link to="/" className="read-article link">
          <h2 style={{ color: "#2980b9" }}>Read articles</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </Link>
      </div>
    </div>
  ) : null;
}
