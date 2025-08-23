const JSON_HEADERS = { "Content-Type": "application/json" };

async function safeFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** Reports */
export const getAllReports = () => safeFetch("/reports/all");
export const getReportById = (id) => safeFetch(`/reports/${id}`);
export const getReportTrends = () => safeFetch("/reports/trends"); // shape: { months:[], counts:[], severities:[] }

/** Appointments */
export const getAllAppointments = () => safeFetch("/appointments/all");

/** Campaigns & Alerts */
export const createCampaign = (payload) =>
  safeFetch("/campaigns/create", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const sendAlert = (payload) =>
  safeFetch("/alerts", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });
