
//let user logout by removing token from local storage
function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();

  };


  ////////////////////////////////////////////////////main///////////////////////////////////////////////////////////

  
  return (
    <button onClick={handleLogout} className="logout-button ml-2">
      Logout
    </button>
  );
}

export default LogoutButton;
