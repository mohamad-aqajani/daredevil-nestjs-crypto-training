export declare type TxReceipt = {
    from: string;
    to: string;
    date: string;
    fee: string | number;
    value: string | number;
    status: "Confirmed" | "Pending" | "Failed";
    hash: string;
}