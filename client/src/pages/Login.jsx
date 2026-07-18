import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(
      "https://authentication-system-s53h.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    alert(data.message);
    navigate("/dashboard");
  } else {
    alert(data.message);
  }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      <br /><br />

      <Link to="/forgot-password"> Forgot Password </Link>

    <br /><br />

    <Link to="/signup">Don't have an account? Sign Up</Link>
    </div>
  );
}

export default Login;