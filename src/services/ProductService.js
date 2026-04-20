const BASE_URL = "https://dummyjson.com/products";

export const getProducts = async (limit, skip) => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};
