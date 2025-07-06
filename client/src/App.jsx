import { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm"; 
import ToDoSection from "./components/ToDoSection";
import Form from "./components/Form";
import DateSection from "./components/DateSection";
import ProgressSection from "./components/ProgressSection";
import LogoutButton from "./components/LogOutButton";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false); 

  // set user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({});
    }
  }, []);


// handle the deletion on todos
  const handleDelete = () => {
    axios
      .delete("http://localhost:3001/api/todos/delete", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        // instead of refreshing the whole page I want to just update the to-do section
        window.dispatchEvent(new Event('todosUpdated'));
      })
      .catch((error) => console.log(error));
  };

  //get user - sign in / login
  if (!user) {
    return showRegister ? (
      <RegisterForm
      // once registered go back to the sign in page
        onRegisterSuccess={() => setShowRegister(false)} 
        onCancel={() => setShowRegister(false)}           
      />
    ) : (
      <LoginForm
        setUser={setUser}
        //link to register page
        onShowRegister={() => setShowRegister(true)}      
      />
    );
  }





////////////////////////////////////////////////////main///////////////////////////////////////////////////////////


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
