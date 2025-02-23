import { useState } from "react";
import { Navigate } from "react-router-dom";


export const Protected = ({ children }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("Auth") === "true"
  );
  const [showDialog, setShowDialog] = useState(!isAuthenticated);

  const correctPassword = import.meta.env.VITE_APP_PASSWORD;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem("Auth", "true");
      setIsAuthenticated(true);
      setShowDialog(false);
    } else {
      alert("Incorrect Password! Try again.");
    }
  };

  if (isAuthenticated) {
    return children;
  } else {
    return showDialog ? (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Enter Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    ) : (
      <Navigate to="/" />
    );
  }
};
