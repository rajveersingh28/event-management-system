import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/analyticsService";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data.analytics);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (!analytics) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Analytics Dashboard</h1>

      <h3>Total Users: {analytics.totalUsers}</h3>

      <h3>Total Events: {analytics.totalEvents}</h3>

      <h3>Total Bookings: {analytics.totalBookings}</h3>

      <h3>Tickets Sold: {analytics.ticketsSold}</h3>

      <h3>Revenue: ₹{analytics.revenue}</h3>
    </div>
  );
}

export default Analytics;