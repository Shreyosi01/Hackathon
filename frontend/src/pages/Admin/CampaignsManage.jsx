import React, { useState } from "react";
import { createCampaign, sendAlert } from "./adminApi";

export default function CampaignsManage() {
  const [form, setForm] = useState({ title: "", description: "", start: "", end: "" });
  const [alertData, setAlertData] = useState({ title: "", body: "" });
  const [status, setStatus] = useState("");

  const onCreate = async (e) => {
    e.preventDefault();
    setStatus("Creating campaign…");
    try {
      await createCampaign(form);
      setStatus("✅ Campaign created");
      setForm({ title: "", description: "", start: "", end: "" });
    } catch {
      setStatus("❌ Failed to create campaign");
    }
  };

  const onAlert = async (e) => {
    e.preventDefault();
    setStatus("Sending alert…");
    try {
      await sendAlert(alertData);
      setStatus("✅ Alert sent");
      setAlertData({ title: "", body: "" });
    } catch {
      setStatus("❌ Failed to send alert");
    }
  };

  return (
    <div className="grid grid-2">
      <form className="card" onSubmit={onCreate}>
        <h2 style={{ marginBottom: 12 }}>Create Campaign</h2>
        <div style={{ display: "grid", gap: 10 }}>
          <input className="input" placeholder="Title" value={form.title}
                 onChange={e => setForm({ ...form, title: e.target.value })} required />
          <textarea className="textarea" placeholder="Description" rows={4} value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} required />
          <div className="grid grid-2">
            <input className="input" type="date" value={form.start}
                   onChange={e => setForm({ ...form, start: e.target.value })} required />
            <input className="input" type="date" value={form.end}
                   onChange={e => setForm({ ...form, end: e.target.value })} required />
          </div>
          <button className="btn" type="submit">Create</button>
        </div>
      </form>

      <form className="card" onSubmit={onAlert}>
        <h2 style={{ marginBottom: 12 }}>Send Push Notification</h2>
        <div style={{ display: "grid", gap: 10 }}>
          <input className="input" placeholder="Notification Title" value={alertData.title}
                 onChange={e => setAlertData({ ...alertData, title: e.target.value })} required />
          <textarea className="textarea" placeholder="Notification Body" rows={4} value={alertData.body}
                    onChange={e => setAlertData({ ...alertData, body: e.target.value })} required />
          <button className="btn" type="submit">Send Alert</button>
        </div>
      </form>

      {status && <div className="card"><p>{status}</p></div>}
    </div>
  );
}
