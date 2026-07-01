import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Events from "./pages/Events/Events";
import EventDetails from "./pages/EventDetails/EventDetails";
import BookTicket from "./pages/BookTicket/BookTicket";
import MyTickets from "./pages/MyTickets/MyTickets";
import Profile from "./pages/Profile/Profile";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Analytics from "./pages/Analytics/Analytics";
import CheckIn from "./pages/CheckIn/CheckIn";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/book/:id" element={<BookTicket />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;