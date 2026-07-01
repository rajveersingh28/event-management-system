import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <Link to="/events">
          <button>Browse Events</button>
        </Link>

        <Link to="/create-event">
          <button>Create Event</button>
        </Link>

        <Link to="/my-tickets">
          <button>My Tickets</button>
        </Link>

        <Link to="/analytics">
          <button>Analytics</button>
        </Link>

        <Link to="/profile">
          <button>Profile</button>
        </Link>

        <Link to="/checkin">
          <button>Check-In</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;