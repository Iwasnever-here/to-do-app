import { useState } from "react";
import axios from "axios";

function RegisterForm({ onRegisterSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.msg) {
        setMessage(res.data.msg);
      } else {
        // Successful registration — go back to login
        onRegisterSuccess();
      }
    } catch (error) {
      setMessage(error);
    }
  };

  ////////////////////////////////////////////////////main///////////////////////////////////////////////////////////

  

  return (
    <div className="text-center p-20 min-h-screen bg-asparagus font-pixelifysans text-spacesparkle ">
      <h2 className="text-2xl mb-4">Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input className="bg-babypowder p-3 mb-3"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input className="bg-babypowder p-3 mb-3"
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
        <button type="submit" className="bg-spacesparkle text-babypowder my-4 p-3 rounded rounded-full">Register</button>
      </form>
      <button onClick={onCancel}>Back to Login</button>
    </div>
  );
}

export default RegisterForm;
