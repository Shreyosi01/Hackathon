import StudentProfile from "./Student";
import DoctorProfile from "./Doctor";

export default function Profile() {
  const role = localStorage.getItem("role");

  if (role === "doctor") {
    return <DoctorProfile user={{ name: "Dr. John Doe", email: "doctor@example.com" }} />;
  }

  return <StudentProfile user={{ name: "Alice Student", email: "student@example.com" }} />;
}