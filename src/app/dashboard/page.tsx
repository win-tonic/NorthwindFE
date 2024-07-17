"use client";

import { useEffect, useState } from "react";
import { IP, SESSION_ID } from "./_utils/constants";
import { Query, SQLMetrics, Worker } from "./_utils/types";
import { useQueryContext } from "../_components/Context";

const DashboardPage = () => {
    const { queries } = useQueryContext();
    const [workerData, setWorkerData] = useState<Worker>({ countryCode: "", iata: "" });
    const [sqlMetrics, setSqlMetrics] = useState<SQLMetrics>({
        queryCount: 0,
        resultCount: 0,
        selectCount: 0,
        selectWhereCount: 0,
        selectLeftJoinCount: 0
    });

    async function fetchWorkerData() {
        const response = await fetch(`https://northwind-iaum.onrender.com/workerData?ip=${IP}`);
        const data = await response.json();
        return data;
    }

    async function fetchData() {
        try {
            const [workerData] = await Promise.all([
                fetchWorkerData(),
            ]);

            setWorkerData(workerData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const totalQueries = queries.length;
        const totalResults = queries.reduce((acc, query) => acc + query.resultCount, 0);
        setSqlMetrics({
            queryCount: totalQueries,
            resultCount: totalResults,
            selectCount: queries.filter(query => query.query.includes("select")).length,
            selectWhereCount: queries.filter(query => query.query.includes("select") && query.query.includes("where")).length,
            selectLeftJoinCount: queries.filter(query => query.query.includes("select") && query.query.includes("left join")).length,
        });
    }, [queries]);

    return (
        <div>
            <div>
                <h2>Worker</h2>
                <p>Colo: {workerData.iata}</p>
                <p>Country: {workerData.countryCode}</p>
            </div>
            <div>
                <h2>SQL Metrics</h2>
                <p>Query count: {sqlMetrics.queryCount}</p>
                <p>Results count: {sqlMetrics.resultCount}</p>
                <p># SELECT: {sqlMetrics.selectCount}</p>
                <p># SELECT WHERE: {sqlMetrics.selectWhereCount}</p>
                <p># SELECT LEFT JOIN: {sqlMetrics.selectLeftJoinCount}</p>
            </div>
            <div>
                <h2>Activity log</h2>
                <ul>
                    {queries.map((query, index) => (
                        <li key={index}>
                            {query.query} ({query.resultCount})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardPage;
