import StudentProfile from "./StudentProfile";
import DoctorProfile from "./DoctorProfile";
import NGOProfile from "./NGOProfile";

export default function Profile() {
  const role = localStorage.getItem("role");

  if (role === "doctor") {
    return <DoctorProfile user={{ name: "Dr. John Doe", email: "doctor@example.com" }} />;
  }

  if (role === "ngo") {
    return <NGOProfile user={{ name: "Helping Hands NGO", email: "ngo@example.com" }} />;
  }

  return <StudentProfile user={{ name: "Alice Student", email: "student@example.com" }} />;
}