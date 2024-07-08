"use client";

import { useEffect, useState } from "react";

const ProductDetailsPage = ({params}: {params: {id: number}}) => {
  const [product, setProduct] = useState<{
    ProductID: number;
    ProductName: string;
    SupplierID: number;
    CategoryID: number;
    QuantityPerUnit: string;
    UnitPrice: number;
    UnitsInStock: number;
    UnitsOnOrder: number;
    ReorderLevel: number;
    Discontinued: number;
  }>({
    ProductID: 0,
    ProductName: "",
    SupplierID: 0,
    CategoryID: 0,
    QuantityPerUnit: "",
    UnitPrice: 0,
    UnitsInStock: 0,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: 0,
  });

  const id = params.id;

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await fetch(
        `https://northwind-iaum.onrender.com/products?id=${productId}`
      );
      const data = await response.json();
      if (data.data && data.data.result.length > 0) {
        setProduct(data.data.result[0]);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (product.ProductID === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Information</h1>
      <p>Product Name</p>
      <p>{product.ProductName}</p>
      <p>Supplier ID</p>
      <p>{product.SupplierID}</p>
      <p>Category ID</p>
      <p>{product.CategoryID}</p>
      <p>Quantity Per Unit</p>
      <p>{product.QuantityPerUnit}</p>
      <p>Unit Price</p>
      <p>{product.UnitPrice}</p>
      <p>Units In Stock</p>
      <p>{product.UnitsInStock}</p>
      <p>Units On Order</p>
      <p>{product.UnitsOnOrder}</p>
      <p>Reorder Level</p>
      <p>{product.ReorderLevel}</p>
      <p>Discontinued</p>
      <p>{product.Discontinued}</p>
    </div>
  );
};

export default ProductDetailsPage;
