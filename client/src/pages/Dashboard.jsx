import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate("/");
    }
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://authentication-system-s53h.onrender.com/api/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setUser(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    alert("Logged Out");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Welcome</h1>

      <button onClick={getProfile}>
        Get Profile
      </button>

      <br /><br />

      <button onClick={handleLogout}>
        Logout
      </button>

      <br /><br />

      <button
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/");
      }}
      >
      Logout
    </button>


    <br /><be />

      {user && (
        <div>
          <h2>Welcome {user.name}</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;