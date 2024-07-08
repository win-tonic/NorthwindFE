"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const itemsPerPage = 15;

const ProductsPage = () => {
  const [products, setProducts] = useState<{
    count: number;
    data: {
      query: string;
      result: {
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
      }[];
    };
  }>({ count: 0, data: { query: "", result: [] } });

  const [pageN, setPageN] = useState<number>(1);

  useEffect(() => {
    fetchProducts(pageN);
  });

  const fetchProducts = async (pageN: number) => {
    try {
      if (
        pageN === 1 ||
        (products.count !== 0 && products.count >= (pageN - 1) * itemsPerPage)
      ) {
        const response = await fetch(
          `https://northwind-iaum.onrender.com/products?limit=${itemsPerPage}&offset=${
            (pageN - 1) * itemsPerPage
          }`
        );
        const data = await response.json();
        console.log(
          "api used:",
          `https://northwind-iaum.onrender.com/products?limit=${itemsPerPage}&offset=${
            (pageN - 1) * itemsPerPage
          }`
        );
        console.log("Products data:", data);
        setProducts(data);
      } else {
        const data = { count: 0, data: { query: "", result: [] } };
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr key="title">
            <th>Name</th>
            <th>Quantity Per Unit</th>
            <th>Unit Price</th>
            <th>Units In Stock</th>
            <th>Units On Order</th>
          </tr>
        </thead>
        <tbody>
          {products.data.result.map((product) => (
            <tr key={product.ProductID}>
              <td><Link href={`/product/${product.ProductID}`}>{product.ProductName}</Link></td>
              <td>{product.QuantityPerUnit}</td>
              <td>{product.UnitPrice}</td>
              <td>{product.UnitsInStock}</td>
              <td>{product.UnitsOnOrder}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPageN(pageN - 1)} disabled={pageN === 1}>
        Previous
      </button>
      <button
        onClick={() => setPageN(pageN + 1)}
        disabled={products.count < itemsPerPage}
      >
        Next
      </button>
    </div>
  );
};

export default ProductsPage;
