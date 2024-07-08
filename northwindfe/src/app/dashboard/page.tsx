"use client";

import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [workerData, setWorkerData] = useState<{
    countryCode: string;
    iata: string;
  }>({ countryCode: "", iata: "" });
  const [sqlMetrics, setSqlMetrics] = useState<{
    queryCount: number;
    resultCount: number;
    selectCount: number;
    selectWhereCount: number;
    selectLeftJoinCount: number;
  }>({
    queryCount: 0,
    resultCount: 0,
    selectCount: 0,
    selectWhereCount: 0,
    selectLeftJoinCount: 0,
  });
  const [activityLog, setActivityLog] = useState<
    {
      SessionID: string | null;
      SessionIP: string | null;
      queriedAt: string | null;
      Query: string | null;
      RowsReturned: number | null;
      ResponseTime: number | null;
    }[]
  >([]);

  const ip = "97.158.48.2";
  const sessionId = "1";

  useEffect(() => {
    fetchWorkerData();
    fetchSqlMetricsAndActivityLog();
  }, []);

  const fetchWorkerData = async () => {
    try {
      const response = await fetch(
        `https://northwind-iaum.onrender.com/workerData?ip=${ip}`
      );
      const data = await response.json();
      console.log("Worker data:", data);
      setWorkerData(data);
    } catch (error) {
      console.error("Error fetching worker data:", error);
    }
  };

  const fetchSqlMetricsAndActivityLog = async () => {
    try {
      const response = await fetch(
        `https://northwind-iaum.onrender.com/responseLogs`,
        {
          headers: { "session-id": sessionId },
        }
      );
      const data = await response.json();
      console.log("SQL data:", data);
      setSqlMetrics(data.stats);
      setActivityLog(data.history);
    } catch (error) {
      console.error("Error fetching SQL metrics and activity log:", error);
    }
  };

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
        {activityLog.length === 0 ? (
          <p>Explore the app and see metrics here</p>
        ) : (
          activityLog.map((log, index) => (
            <p key={index}>
              {log.queriedAt} - {log.Query}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
