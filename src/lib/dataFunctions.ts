import axios from "axios";
export const getSingleProduct = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCTS_URL}/${id}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getProductList = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const addProductToCart = (product) => {
  const data = localStorage.getItem("products");
  if (data) {
    const products = JSON.parse(data);
    if (products.some((p) => p.id == product.id)) return;
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
  } else {
    localStorage.setItem("products", JSON.stringify([product]));
  }
};
