import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/general/Navbar";
import Login from "./pages/Login";
import RegisterAsMember from "./pages/RegisterAsMember";
import RegisterAsAdmin from "./pages/RegisterAsAdmin";
import { useState } from "react";
import BilingPage from "./pages/BilingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const RequireAuth = ({ children }) => {
    return JSON.parse(currentUser).isAdmin ? children : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Navbar user={currentUser} />
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      <Routes>
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      <Routes>
        <Route
          path="/add-member"
          element={
            <RequireAuth>
              <RegisterAsMember />
            </RequireAuth>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/biling"
          element={
            <RequireAuth>
              <BilingPage />
            </RequireAuth>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/admin/signup"
          element={currentUser ? <Navigate to="/" /> : <RegisterAsAdmin />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
