import { useState } from "react";
import { createEvent } from "../../services/eventService";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    time: "",
    price: "",
    totalTickets: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEvent(formData);

      alert("Event Created Successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        date: "",
        time: "",
        price: "",
        totalTickets: "",
        image: "",
      });

    } catch (err) {
      console.log(err);

      if (err.response) {
        console.log(err.response.data);
        alert(err.response.data.message);
      } else {
        alert("Failed to create event.");
      }
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h1>Create Event</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="time"
          placeholder="10:00 AM"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="totalTickets"
          placeholder="Total Tickets"
          value={formData.totalTickets}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Event
        </button>

      </form>
    </div>
  );
}

export default CreateEvent;