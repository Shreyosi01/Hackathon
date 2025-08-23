import api from "../api";

export async function login(identifier, password) {
    const res = await api.post("http://127.0.0.1:8000/login", {
      identifier,   // backend expects this field
      password,     // backend expects this field
    });
  
    const { access_token } = res.data;
    localStorage.setItem("token", access_token);
    return access_token;
  }
  
  export function isLoggedIn() {
    return !!localStorage.getItem("token");
  }
  
  export function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  
  export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }  

export async function fetchMyProfile() {
  try {
    const res = await fetch("http://127.0.0.1:8000/my_profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if JWT
      },
      credentials: "include", // if using cookies
    });

    if (!res.ok) throw new Error("Failed to fetch profile");
    return await res.json();
  } catch (err) {
    console.error("Error fetching profile:", err);
    return null;
  }
}
