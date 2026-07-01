import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "15px",
        padding: "15px",
        background: "#222",
        color: "#fff",
        alignItems: "center",
      }}
    >
      <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
        Dashboard
      </Link>

      <Link to="/events" style={{ color: "white", textDecoration: "none" }}>
        Events
      </Link>

      <Link
        to="/create-event"
        style={{ color: "white", textDecoration: "none" }}
      >
        Create Event
      </Link>

      <Link
        to="/my-tickets"
        style={{ color: "white", textDecoration: "none" }}
      >
        My Tickets
      </Link>

      <Link
        to="/analytics"
        style={{ color: "white", textDecoration: "none" }}
      >
        Analytics
      </Link>

      <Link
        to="/profile"
        style={{ color: "white", textDecoration: "none" }}
      >
        Profile
      </Link>

      <button
        onClick={handleLogout}
        style={{
          marginLeft: "auto",
          cursor: "pointer",
          padding: "8px 15px",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;