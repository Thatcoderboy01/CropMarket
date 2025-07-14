const BASE_URL = "https://cropmarket-hfds.onrender.com/api/auth";  // Backend API ka base URL

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",  // Agar cookies me JWT bhejna ho
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  return response.json();
};

export const getUserData = async () => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
};
