const BASE_URL = "http://localhost:5000/api";

export const getSchemes = async () => {
  const res = await fetch(`${BASE_URL}/schemes`);
  return res.json();
};

export const getSchemeById = async (id) => {
  const res = await fetch(`${BASE_URL}/schemes/${id}`);
  return res.json();
};
