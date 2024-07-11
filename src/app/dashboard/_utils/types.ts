export type SQLMetrics = {
    queryCount: number;
    resultCount: number;
    selectCount: number;
    selectWhereCount: number;
    selectLeftJoinCount: number;
};
export type Worker = {
    countryCode: string;
    iata: string;
};

export type Query = {
    SessionID: string | null;
    SessionIP: string | null;
    queriedAt: string | null;
    Query: string | null;
    RowsReturned: number | null;
    ResponseTime: number | null;
};
