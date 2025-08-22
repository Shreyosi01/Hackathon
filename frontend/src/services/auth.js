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