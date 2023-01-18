import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const logOutUser = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <div className="h-16 fixed w-full z-10 bg-slate-900 text-white">
      <div className="max-w-7xl px-8 mx-auto h-full flex justify-between items-center">
        <div>
          <Link to="/">Member System</Link>
        </div>
        <div>
          {JSON.parse(props.user) ? (
            <div className="space-x-4">
              {JSON.parse(props.user).isAdmin ? (
                <>
                  <Link to="/add-member">Add Member</Link>
                  <Link to="/biling">Biling</Link>
                </>
              ) : (
                ""
              )}
              <span className="text-white font-bold uppercase">
                {JSON.parse(props.user).user.name}
              </span>

              <button
                className="border bg-gray-700 text-white capitalize ml-6 py-2 px-2 rounded-md"
                onClick={logOutUser}
              >
                logout
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
