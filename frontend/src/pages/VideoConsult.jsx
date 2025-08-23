import { useState } from "react";
import Container from "../components/Container";
import "./VideoConsult.css";

function SuccessPopup({ onClose }) {
  return (
    <div className="video-popup-overlay">
      <div className="video-popup">
        <h3 className="video-popup-title">Booking Confirmed!</h3>
        <p className="video-popup-message">
          Your video consultation has been successfully booked.
        </p>
        <button className="video-popup-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default function VideoConsult() {
  const [form, setForm] = useState({ date: "", doctor: "", reason: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // assuming JWT is saved in localStorage

      const response = await fetch("http://localhost:8000/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send JWT for auth
        },
        body: JSON.stringify({
          doctor_id: parseInt(form.doctor), // assuming doctor_id is numeric
          date_time: form.date,
          description: form.reason,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.detail || "Booking failed");
        return;
      }

      await response.json();
      setShowPopup(true);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <section className="video-section">
        <h2 className="video-heading">Book a Video Consultation</h2>
        <form className="video-form" onSubmit={handleSubmit}>
          <label htmlFor="date" className="video-label">Date & Time</label>
          <input
            id="date"
            type="datetime-local"
            className="video-input"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            required
          />

          <label htmlFor="doctor" className="video-label">Doctor</label>
          <select
            id="doctor"
            className="video-input"
            value={form.doctor}
            onChange={(e) => setForm((f) => ({ ...f, doctor: e.target.value }))}
            required
          >
            <option value="">Select doctor</option>
            <option value="1">Dr. Asha Mehra</option>
            <option value="2">Dr. Rajiv Singh</option>
            <option value="3">Dr. Priya Nair</option>
            <option value="4">Dr. Amit Patel</option>
            <option value="5">Dr. Sunita Rao</option>
          </select>

          <label htmlFor="reason" className="video-label">Reason</label>
          <input
            id="reason"
            type="text"
            className="video-input"
            value={form.reason}
            onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
            placeholder="Describe your issue"
            required
          />
          <button
            type="submit"
            className="video-button"
            aria-label="Book video consultation"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book"}
          </button>
        </form>

        {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}
      </section>
    </Container>
  );
}
