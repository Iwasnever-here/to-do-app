function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();

  };

  return (
    <button onClick={handleLogout} className="logout-button ml-2">
      Logout
    </button>
  );
}

export default LogoutButton;
