import React, { useEffect, useState } from "react";
import StudentProfile from "./Profile/Student";
import DoctorProfile from "./Profile/Doctor";
import { fetchMyProfile } from "../services/auth";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>Failed to load profile</div>;

  if (profile.role === "doctor") return <DoctorProfile user={profile} />;
  return <StudentProfile user={profile} />;
}