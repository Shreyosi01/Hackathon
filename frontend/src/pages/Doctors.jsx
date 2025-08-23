import { useState, useEffect } from "react";
import Container from "../components/Container";
import "./Doctors.css";

const mockDoctors = [
  { name: "Dr. Asha Mehra", specialty: "Cardiologist", rating: 4.8, location: "Delhi", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Dr. Rajiv Singh", specialty: "Dermatologist", rating: 4.5, location: "Mumbai", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Dr. Priya Nair", specialty: "Pediatrician", rating: 4.7, location: "Bangalore", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Dr. Amit Patel", specialty: "Orthopedic", rating: 4.2, location: "Kolkata", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Dr. Sunita Rao", specialty: "Gynecologist", rating: 4.9, location: "Chennai", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
];

export default function Doctors() {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState(mockDoctors);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDoctors(mockDoctors);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <section className="doctors-section">
        <h2 className="doctors-heading">Meet Our Team</h2>
        <div className="doctors-grid">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="doctor-card skeleton">
                  <div className="avatar-skeleton" />
                  <div className="line-skeleton w32" />
                  <div className="line-skeleton w24" />
                  <div className="line-skeleton w20" />
                  <div className="button-skeleton" />
                </div>
              ))
            : doctors.map((d) => (
                <div key={d.name} className="doctor-card">
                  <img src={d.avatar} alt={d.name} className="doctor-avatar" />
                  <h3 className="doctor-name">{d.name}</h3>
                  <div className="doctor-specialty">{d.specialty}</div>
                  <button
                    className="contact-button"
                    aria-label={`Contact ${d.name}`}
                    onClick={() =>
                      window.open(
                        `mailto:team@caresync.com?subject=Contact%20${encodeURIComponent(
                          d.name
                        )}`
                      )
                    }
                  >
                    Contact
                  </button>
                </div>
              ))}
        </div>
      </section>
    </Container>
  );
}
