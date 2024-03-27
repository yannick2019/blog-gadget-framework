import { useUser, useSignOut } from "@gadgetinc/react";
import { useEffect } from "react";
import { api } from "../api";
import userIcon from "../assets/default-user-icon.svg";
import { Link } from "react-router-dom";

export default function () {
  const user = useUser(api);
  const signOut = useSignOut();

  useEffect(() => {
    document.title = `Profile - ${process.env.GADGET_PUBLIC_APP_SLUG}`;
  }, []);

  return user ? (
    <>
      <div className="profile-container">
        <h1 style={{ paddingBottom: "30px", paddingTop: "10px", color: "#2e86de" }}>Profile</h1>
        <div className="card-stack">
          <div className="card user-card">
            <div className="card-content">
              <img className="icon" src={user.googleImageUrl ?? userIcon} />
              <div className="userData">
                <p>
                  name: {user.firstName} {user.lastName}
                </p>
                <p>email: {user.email}</p>
                <p>created: {user.createdAt.toString()}</p>
              </div>
            </div>
          </div>
          <div className="flex-vertical gap-4px">
            <strong>Actions:</strong>
            <Link to="/change-password">Change password</Link>
            <a onClick={signOut}>Sign Out</a>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
