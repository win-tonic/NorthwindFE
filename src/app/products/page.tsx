"use client";

import { Product } from "@/types/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

const itemsPerPage = 15;

export default function ProductsPage() {
    const searchParams = useSearchParams();

    const [page, setPage] = useState<number>(+searchParams.get("page")!);
    const [products, setProducts] = useState<{
        count: number;
        data: {
            query: string;
            result: Product[];
        };
    }>({ count: 0, data: { query: "", result: [] } });
    console.log("products", products);

    async function fetchProducts(newPage: number) {
        console.log("fetchProducts", newPage);

        try {
            const queryParam =
                newPage === 1
                    ? ""
                    : `?limit=${itemsPerPage}&offset=${(newPage - 1) * itemsPerPage}`;
            const url = new URL(window.location.href);
            url.searchParams.set("page", newPage.toString());
            window.history.pushState({}, "", url.toString());

            const response = await fetch(
                `https://northwind-iaum.onrender.com/products${queryParam}`
            );
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products data:", error);
        }
    }

    function handlePageChange(direction: "prev" | "next") {
        const newPage = direction === "prev" ? page - 1 : page + 1;
        setPage(newPage);
        fetchProducts(newPage);
    }

    useEffect(() => {
        fetchProducts(page);
    }, []);

    return (
        <div className='wrapper'>
            <h1>Products</h1>
            <table>
                <thead>
                    <tr key='title'>
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
                            <td>
                                <Link href={`/product/${product.ProductID}`}>
                                    {product.ProductName}
                                </Link>
                            </td>
                            <td>{product.QuantityPerUnit}</td>
                            <td>{product.UnitPrice}</td>
                            <td>{product.UnitsInStock}</td>
                            <td>{product.UnitsOnOrder}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={() => handlePageChange("prev")}
                disabled={page < 2}
            >
                Previous
            </button>
            <button
                onClick={() => handlePageChange("next")}
                disabled={products.data.result.length < itemsPerPage}
            >
                Next
            </button>
        </div>
    );
}
