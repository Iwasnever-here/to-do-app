import { useState } from "react";
import axios from "axios";

function LoginForm({ setUser, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    console.log("you made it")
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("https://to-do-app-bae5.onrender.com/api/auth/login", {
        email,
        password,
      });
      if (res.data.msg) {
        setMessage(res.data.msg);
      } else {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      }
    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="text-center p-20 min-h-screen bg-asparagus font-pixelifysans text-spacesparkle ">
      <h2 className="text-2xl mb-4">Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input className="bg-babypowder mb-3 p-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input className="bg-babypowder p-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="bg-spacesparkle text-babypowder my-4 p-3 rounded rounded-full">Log In</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={onShowRegister} className="text-lg ml-2 underline">Register here</button>
      </p>
    </div>
  );
}

export default LoginForm;
