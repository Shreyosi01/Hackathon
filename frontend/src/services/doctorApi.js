// src/services/doctorApi.js
const JSON_HEADERS = { "Content-Type": "application/json" };

/** Helper that falls back to mock if backend not present */
async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (e) {
    // --- MOCKS for demo ---
    if (url.startsWith("/appointments/doctor")) {
      return [
        { id: 101, patient_name: "Riya Sharma", date: "2025-08-24", time: "10:00", status: "pending", reason: "Headache", mode: "Video" },
        { id: 102, patient_name: "Ankit Verma", date: "2025-08-24", time: "11:30", status: "done", reason: "Allergy", mode: "In-clinic" },
        { id: 103, patient_name: "Meera Iyer", date: "2025-08-25", time: "09:45", status: "pending", reason: "Follow-up", mode: "Video" },
      ];
    }
    if (url.startsWith("/patients/past")) {
      return [
        {
          id: "p1",
          name: "Riya Sharma",
          disease: "Migraine",
          last_visit: "2025-08-05",
          reports: [
            { id: 9001, title: "MRI Summary", created_at: "2025-08-01", lat: 28.6139, lng: 77.2090 },
            { id: 9002, title: "Blood Work", created_at: "2025-08-02", lat: 28.7041, lng: 77.1025 },
          ],
        },
        {
          id: "p2",
          name: "Ankit Verma",
          disease: "Allergic Rhinitis",
          last_visit: "2025-07-22",
          reports: [
            { id: 9003, title: "Allergy Panel", created_at: "2025-07-20", lat: 19.0760, lng: 72.8777 },
          ],
        },
      ];
    }
    if (url.startsWith("/reports/doctor")) {
      // flattened list of reports for map panel
      return [
        { id: 9001, title: "MRI Summary", user_name: "Riya Sharma", created_at: "2025-08-01", lat: 28.6139, lng: 77.2090 },
        { id: 9002, title: "Blood Work", user_name: "Riya Sharma", created_at: "2025-08-02", lat: 28.7041, lng: 77.1025 },
        { id: 9003, title: "Allergy Panel", user_name: "Ankit Verma", created_at: "2025-07-20", lat: 19.0760, lng: 72.8777 },
      ];
    }
    if (url.match(/^\/\d+\/status$/) && options.method === "PUT") {
      return { ok: true };
    }
    throw e;
  }
}

export const getDoctorAppointments = () => safeFetch("/appointments/doctor");
export const updateAppointmentStatus = (id, status) =>
  safeFetch(`/${id}/status`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify({ status }),
  });

export const getPastPatients = () => safeFetch("/patients/past");
export const getDoctorReports = () => safeFetch("/reports/doctor");
