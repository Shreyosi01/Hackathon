import api from "../api";

export async function login(identifier, password) {
    const res = await api.post("/auth/login", {
      identifier,   // backend expects this field
      password,     // backend expects this field
    });
  
    const { access_token } = res.data;
    localStorage.setItem("token", access_token);
    return access_token;
  }