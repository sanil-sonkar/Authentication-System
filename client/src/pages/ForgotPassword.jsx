import { useState } from "react";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const handleForgotPassword = async () => {
    const res = await fetch(
      "https://authentication-system-s53h.onrender.com/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    alert(data.message);

    if (data.resetToken) {
      alert("Reset Token: " + data.resetToken);
      navigate("/reset-password");
    }
  };

  return (
    <div className="container">
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={handleForgotPassword}>
        Send Reset Token
      </button>
    </div>
  );
}

export default ForgotPassword;