import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoding] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    setLoading(true);

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

  setLoading(false);
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

      <div style={{ position: "relative", display: "inline-block" }}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{ paddingRight: "40px" }}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    }}
  >
    👁️
  </span>
</div>

      <br /><br />
      <button onClick={handleLogin} disabled={loading}>
      {loading ? "Loading..." : "Login"}
      </button>

      <br /><br />
      <Link to="/forgot-password"> Forgot Password </Link>

    <br /><br />

    <Link to="/signup">Don't have an account? Sign Up</Link>
    </div>
  );
}

export default Login;