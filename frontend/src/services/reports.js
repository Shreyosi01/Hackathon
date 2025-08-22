import api from "../api";

export async function getReports() {
  const token = localStorage.getItem("token");
  const res = await api.get("/reports", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
