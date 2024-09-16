"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface Transaction {
  signature: string;
  date: string;
  amount: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Transaction[];
}

const TransactionFetcher: React.FC = () => {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey) {
      const fetchTransactions = async () => {
        setLoading(true);
        try {
          console.log(
            "Fetching transactions for public key:",
            publicKey.toString()
          );

          const response = await fetch(
            `https://ribh-store.vercel.app/api/v1/transaction?publicKey=${publicKey.toString()}&numTx=2`
          );
          const result: ApiResponse = await response.json();

          console.log("API Response:", result);

          if (result.success) {
            console.log("Transactions fetched:", result.data);
            if (result.data && result.data.length > 0) {
              setTransactions(result.data);
              setError(null);
            } else {
              console.warn("No transactions found.");
              setError("No transactions found.");
            }
          } else {
            console.error("Failed to fetch transactions:", result.message);
            setError("Failed to fetch transactions.");
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [publicKey]);

  if (!publicKey) {
    return <div>Please connect your wallet to view transactions.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            <p>
              <strong>Signature:</strong> {tx.signature}
            </p>
            <p>
              <strong>Date:</strong> {new Date(tx.date).toLocaleString()}
            </p>
            <p>
              <strong>Amount:</strong> {tx.amount} SOL
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionFetcher;
