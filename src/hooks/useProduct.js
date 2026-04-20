import { useEffect, useState } from "react";

export function useProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const limit = 16;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productRes, categoryRes] = await Promise.all([
          fetch("https://dummyjson.com/products?limit=100"),
          fetch("https://dummyjson.com/products/categories"),
        ]);

        const productData = await productRes.json();
        const categoryData = await categoryRes.json();

        setAllProducts(productData.products || []);
        setCategories(["all", ...categoryData]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setPage(1);
    setProducts(filtered);
  }, [search, category, sort, allProducts]);

  const total = products.length;

  const paginated = products.slice((page - 1) * limit, page * limit);

  return {
    products: paginated,
    allProducts,
    categories,
    loading,
    setCategory,
    setSort,
    page,
    setPage,
    total,
    setSearch,
    search,
  };
}
