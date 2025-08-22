import { useState } from "react";
import Container from "../components/Container";
import "./VideoConsult.css"; // import the CSS file

const mockDoctors = [
  "Dr. Asha Mehra",
  "Dr. Rajiv Singh",
  "Dr. Priya Nair",
  "Dr. Amit Patel",
  "Dr. Sunita Rao",
];

export default function VideoConsult() {
  const [form, setForm] = useState({ date: "", doctor: "", reason: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Container>
      <section className="video-section">
        <h2 className="video-heading">Book a Video Consultation</h2>
        <form className="video-form" onSubmit={handleSubmit}>
          <label htmlFor="date" className="video-label">Date</label>
          <input
            id="date"
            type="date"
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
            {mockDoctors.map((d) => (
              <option key={d}>{d}</option>
            ))}
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
          >
            Book
          </button>
        </form>
      </section>
    </Container>
  );
}
