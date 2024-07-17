"use client";

import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import s from "./styles.module.css";
import { useQueryContext } from "../../_components/Context";

const ProductDetailsPage = ({ params }: { params: { id: number } }) => {
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const { addQuery } = useQueryContext();

    const fetchProductDetails = async () => {
        setIsLoading(false);
        try {
            const productRes = await fetch(
                `https://northwind-iaum.onrender.com/products?id=${params.id}`
            );
            const data = (await productRes.json()) as {data: { query: string; result: Product[] }};
            if (data.data && data.data.result.length > 0) {
                setProduct(data.data.result[0]);
                addQuery(data.data.query, data.data.result.length);
            }
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                <button onClick={fetchProductDetails}>Refresh</button>
            </div>
        );
    }

    return (
        <div className={s.wrapper}>
            {product && (
                <>
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
                </>
            )}
        </div>
    );
};

export default ProductDetailsPage;
