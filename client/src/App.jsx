import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";  // Make sure you have this component
import ToDoSection from "./components/ToDoSection";
import Form from "./components/Form";
import DateSection from "./components/DateSection";
import ProgressSection from "./components/ProgressSection";
import axios from "axios";
import LogoutButton from "./components/LogOutButton";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);  // <-- Added this line

  useEffect(() => {
    // Check if token exists and try to fetch user info or just set user from token (optional)
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally, verify token or fetch user profile here
      setUser({}); // Or fetch user info from backend
    }
  }, []);

  const handleDelete = () => {
    axios
      .delete("http://localhost:3001/api/todos/delete", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  if (!user) {
    return showRegister ? (
      <RegisterForm
        onRegisterSuccess={() => setShowRegister(false)}  // Go back to login after successful register
        onCancel={() => setShowRegister(false)}           // Go back to login on cancel
      />
    ) : (
      <LoginForm
        setUser={setUser}
        onShowRegister={() => setShowRegister(true)}      // Show register form when clicked
      />
    );
  }

  return (
    <div className="text-center p-20 min-h-screen bg-asparagus font-pixelifysans text-spacesparkle flex items-center justify-center h-screen">
      <div className="w-115">
        <div className="flex gap-3">
          <div className="w-35 flex-auto">
            <DateSection />
          </div>
          <div className="w-65 flex-auto">
            <ProgressSection />
            <Form />
          </div>
        </div>
        <ToDoSection />
        <div>
          <button
            className="all bg-spacesparkle p-4 mt-6 rounded-2xl  text-babypowder text-2xl"
            onClick={handleDelete}
          >
            FINISH DAY
          </button>
          <LogoutButton setUser={setUser} />
        </div>
      </div>
    </div>
  );
}

export default App;
