function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('token'); // remove JWT token
    // Option 1: Reload page to reset state
    window.location.reload();

    // Option 2: Redirect to login page (if you have routing)
    // window.location.href = '/login';
  };

  return (
    <button onClick={handleLogout} className="logout-button ml-2">
      Logout
    </button>
  );
}

export default LogoutButton;
