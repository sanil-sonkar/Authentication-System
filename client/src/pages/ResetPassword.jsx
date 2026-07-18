import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const handleResetPassword = async () => {
    const res = await fetch(
      "http://localhost:5000/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);
    if(res.ok) {
        navigate("/");
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>

      <input
        type="text"
        placeholder="Reset Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;