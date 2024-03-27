import { SignedOut, useSignOut, SignedIn } from "@gadgetinc/react";
import { Link } from "react-router-dom";
import "./App.css";

const Header = () => {
  const signOut = useSignOut();
  return (
    <div className="header">
      <a
        href="/"
        target="_self"
        rel="noreferrer"
        style={{ textDecoration: "none" }}
      >
        <div className="logo">{process.env.GADGET_PUBLIC_APP_SLUG}</div>
      </a>
      <div className="header-content">
        <SignedOut>
          <Link to="/" style={{ color: "black" }}>
            Articles
          </Link>
          <Link to="/sign-in" style={{ color: "black" }}>
            Sign in
          </Link>
          <Link to="/sign-up" style={{ color: "black" }}>
            Sign up
          </Link>
        </SignedOut>
        <SignedIn>
          <Link to="/create-post" style={{ textDecoration: "none", color: "#2e86de" }}>
            Create new article
          </Link>
          <Link to="/signed-in" style={{ color: "black" }}>
            Home
          </Link>
          <Link to="/" style={{ color: "black" }}>
            Articles
          </Link>
          <Link to="/profile" style={{ color: "black" }}>
            Profile
          </Link>
          <a onClick={signOut}>Sign Out</a>
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
