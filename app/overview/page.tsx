"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import coverImage from "@/assets/images/Coversvg.svg";
import profile from "@/assets/images/profileAvatar.svg";
import { Typography } from "@/components/typography";
import walletpic from "@/assets/images/walletsvg.svg";
import DollarIcon from "@/assets/svg-comps/usdc";
import Coin from "@/assets/svg-comps/coin";
import ShoppingBag from "@/assets/svg-comps/shopping-bag";
import container from "@/assets/images/Containerblock.svg";
import { Button } from "@/components/button";
import shopping from "@/assets/images/bag-dynamic-color.svg";
import Plus from "@/assets/svg-comps/plus";
import BluePlus from "@/assets/svg-comps/blue-pick";
import { data, formatTime } from "./dummydata";
import TableComp from "@/components/table-comp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateTransaction,
  updateTransactionState,
} from "@/store/redux-slices/transaction-slice";
import { formatDate } from "./dummydata";
import { clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import UpDown from "@/assets/svg-comps/up-and-down";
function Page() {
  const dispatch = useDispatch();
  //   const transactionData = useSelector(
  //     (state: any) => state.transaction.transaction
  //   );
  //   const isTransactionSuccessful = useSelector(
  //     (state: any) => state.transaction.success
  //   );
  const { publicKey } = useWallet(); // Get the public key from the wallet
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   useEffect(() => {
  //     const getUserTransactions = async () => {
  //       const getUserId = localStorage.getItem("publicKey");
  //       const response = await axios.get(
  //         `https://ribh-store.vercel.app/api/v1/transaction?publicKey=4CE8tAXQWtesSuqiR8vsLwtKN1zMoif45RzdzWCD5fz9&numTx=2`
  //       );
  //       const { data, success, message } = response.data;
  //       console.log(response);
  //       dispatch(updateTransaction(data));
  //       dispatch(updateTransactionState(success));
  //       toast.success(message, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     };

  //     getUserTransactions();
  //   }, []);

  useEffect(() => {
    // Fetch transactions only if publicKey is available
    if (publicKey) {
      const fetchTransactions = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://ribh-store.vercel.app/api/v1/transaction?publicKey=${publicKey.toString()}&numTx=2`
          );
          const result = await response.json();

          if (result.success) {
            setTransactions(result.data);
          } else {
            setError("Failed to fetch transactions.");
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [publicKey]); // Re-fetch if publicKey changes

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
    <>
      <div className="flex md:max-w-[406px] lg:w-[406px] flex-col items-start gap-4 h-full mxs:w-full">
        <div className=" relative flex w-full h-fit flex-col p-[16px_16px_16px_16px] items-start gap-1 self-stretch rounded-[16px] border border-[#7839EE] bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
          <div className="mx-auto relative flex w-[374px] mxs:w-[350px] mxxs:w-[310px] h-[200px] p-4 justify-end items-start gap-1 flex-shrink-0">
            <Image
              className="absolute"
              src={coverImage}
              alt={"coverImage"}
              fill
            />
          </div>
          <div className=" mx-auto relative flex w-[147px] flex-col items-center gap-2  top-[-50px]">
            <div className="relative w-[120px] h-[120px] rounded-[20px] pb-[20px]">
              <Image className="absolute" src={profile} alt="profile" fill />
            </div>
            <div className=" relative flex flex-col justify-center items-center gap-2 self-stretch">
              <Typography>James Dancer</Typography>
              <div className="flex p-2 px-3 items-center gap-2 rounded-[24px] bg-[#000] ">
                <Typography customClassName="text-white font-inter text-sm font-medium leading-normal">
                  @james_dancer
                </Typography>
              </div>
            </div>
          </div>
        </div>
        {/* /*-----second div-----/ */}
        <div className="flex flex-col items-start p-4 gap-3 self-stretch rounded-[16px] bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
          <div className="flex md:flex-col items-start gap-2 self-stretch mxs:flex-row-reverse mxs:justify-between ">
            <div className=" relative flex w-[40px] h-[40px] p-[8px] justify-center items-center">
              <Image src={walletpic} alt="wallet-pic" fill />
            </div>
            <div>
              <Typography customClassName="text-[#48258B] font-inter text-[16px] font-medium leading-normal">
                Wallet Balance
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-[7px] self-stretch">
            <DollarIcon />
            <Typography customClassName="text-[#000] font-inter text-[32px] font-bold leading-normal">
              52,468.56
            </Typography>
          </div>
        </div>
        {/* /*-----third div-----/ */}
        <div className="flex flex-col items-start p-4 gap-3 self-stretch rounded-[16px] bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
          <div className="flex md:flex-col items-start gap-2 self-stretch mxs:flex-row-reverse mxs:justify-between ">
            <Coin />
            <div>
              <Typography customClassName="text-[#48258B] font-inter text-[16px] font-medium leading-normal">
                Total Earnings
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-[7px] self-stretch">
            <DollarIcon />
            <Typography customClassName="text-[#000] font-inter text-[32px] font-bold leading-normal">
              12,678.42
            </Typography>
          </div>
        </div>
        {/* /*-----fourth div-----/ */}
        <div className="flex items-start gap-2 self-stretch mxs:flex-col mxs:w-full">
          <div className="flex  flex-col items-start p-4 gap-3 flex-1 rounded-lg bg-white shadow-lg mxs:w-full">
            <div className="mxs:flex mxs:flex-row-reverse mxs:justify-between mxs:w-full">
              <ShoppingBag />
              <Typography customClassName="text-[#48258B] font-inter text-[16px] font-medium leading-normal">
                {" "}
                Total Products
              </Typography>
            </div>
            <Typography customClassName="text-[#000] font-inter text-[32px] font-bold leading-normal">
              429
            </Typography>
          </div>
          <div className="flex flex-col items-start p-4 gap-3 flex-1 rounded-lg bg-white shadow-lg mxs:w-full">
            <div className="mxs:flex mxs:flex-row-reverse mxs:justify-between mxs:w-full">
              <UpDown />
              <Typography customClassName="text-[#48258B] font-inter text-[16px] font-medium leading-normal">
                {" "}
                Total Transactions
              </Typography>
            </div>
            <Typography customClassName="text-[#000] font-inter text-[32px] font-bold leading-normal">
              429
            </Typography>
          </div>
        </div>
        {/* /*-----fourth div-----/ */}
        <div
          className="relative w-full h-[360px] p-8 flex flex-col justify-between items-center bg-cover bg-center rounded-[8px]"
          style={{ backgroundImage: `url(${container})` }}
        >
          {/* Shopping Image */}
          <div className="relative  mxs:left-0">
            <Image src={shopping} alt="shopping" width={176} height={176} />
          </div>

          {/* Button */}
          <div className="relative  mxs:left-0">
            <Button
              label="Create Product"
              leftIcon={<BluePlus />}
              fit
              customClassName="flex h-[56px] p-[16px_24px] justify-center items-center gap-[8px] bg-white rounded-[32px] text-[#7839EE]"
            />
          </div>
        </div>
      </div>
      <div className="flex max-w-[616px] lg:w-[616px] h-[1229px] flex-col items-start rounded-[16px] bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] mmd:w-full">
        <div className="flex h-16 p-2 pl-4 pb-3 items-center gap-4 flex-shrink-0 self-stretch border-b border-[#DFDFDF] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)] rounded-t-[8px]">
          <Typography customClassName="text-[#272727] font-inter text-lg font-medium leading-normal">
            Transactions
          </Typography>
        </div>
        <div className="flex items-start  self-stretch border">
          {/* {isTransactionSuccessful ? (
            <div className="w-full">
              {transactionData.map((items, index) => (
                <TableComp
                  text1={items.signature}
                  text2={items.signature}
                  text3={formatDate(items.date)}
                  text4={formatTime(items.date)}
                  text5={items.amount}
                />
              ))}
            </div>
          ) : (
            <div>loading...</div>
          )} */}

          {/* <div className="flex p-2 items-start gap-1 self-stretch">

                </div> */}
        </div>
      </div>
    </>
  );
}

export default Page;
