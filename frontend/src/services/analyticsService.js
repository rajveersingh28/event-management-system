import api from "./api";

export const getAnalytics = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/analytics/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};