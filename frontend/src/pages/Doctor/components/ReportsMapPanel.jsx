import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getDoctorReports } from "../../../services/doctorApi";

const pin = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

export default function ReportsMapPanel() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorReports().then(setReports).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2 style={{ marginBottom: 12 }}>Reports Map (Your Patients)</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: 420, width: "100%", borderRadius: 12 }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {reports.filter(r => r.lat && r.lng).map((r) => (
            <Marker key={r.id} position={[r.lat, r.lng]} icon={pin}>
              <Popup>
                <strong>{r.title}</strong><br />
                {r.user_name}<br />
                {r.created_at}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
