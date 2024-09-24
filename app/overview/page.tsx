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
import { formatTime } from "./dummydata";
// import { Connection, PublicKey } from '@solana/web3.js';
import TableComp from "@/components/table-comp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateTransaction,
  updateTransactionState,
} from "@/store/redux-slices/transaction-slice";
import { GetProgramAccountsFilter } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { formatDate } from "./dummydata";

import Logo from "@/assets/images/Logo.svg";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

import UpDown from "@/assets/svg-comps/up-and-down";
import { useRouter } from "next/navigation";
import { shortenString } from "@/components/table-comp";

interface Transaction {
  signature: string;
  date: string;
  amount: number;
}
function Page() {
  const transactionData = useSelector(
    (state: { transaction: { transaction: Transaction[] } }) =>
      state.transaction.transaction
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const { publicKey, signTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileObject, setProfileObject] = useState({});
  const [parseHistoryUrl, setParseHistoryUrl] = useState<string>("");
  const [bonkBalance, setBonkBalance] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [usdcBalance, setUsdcBalance] = useState("0.00");
  const walletToQuery = publicKey ? publicKey.toBase58() : "";
  const { connection } = useConnection();
  const isTransactionSuccessful = useSelector(
    (state: any) => state.transaction.success
  );

  const USDC_MAINNET_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
  const fetchUsdcBalance = async () => {
    if (!publicKey) return;
    try {
      const filters: GetProgramAccountsFilter[] = [
        {
          dataSize: 165, // size of token account
        },
        {
          memcmp: {
            offset: 32, // owner address (wallet public key)
            bytes: publicKey.toBase58(), // base58 encoded wallet public key
          },
        },
        {
          memcmp: {
            offset: 0, // mint address location
            bytes: USDC_MAINNET_MINT, // USDC mint address for Mainnet
          },
        },
      ];

      const accounts = await connection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,
        { filters: filters }
      );

      if (accounts.length > 0) {
        const tokenAmount = accounts
          .map((account) => {
            const parsedAccountInfo: any = account.account.data;
            return (
              parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"] ||
              0
            );
          })
          .reduce((acc, curr) => acc + curr, 0); // Sum all USDC balances
        setUsdcBalance(tokenAmount.toFixed(2)); // Format to 2 decimal places
      } else {
        setUsdcBalance("0.00");
      }
    } catch (error) {
      console.error("Error fetching USDC balance:", error);
      setUsdcBalance("0.00");
    }
  };
  useEffect(() => {
    if (publicKey) {
      setLoading(true);

      // Fetch balances every 10 seconds
      const fetchBalances = async () => {
        await fetchUsdcBalance();
        setLoading(false); // Stop loading when data is fetched
      };

      fetchBalances();
      const intervalId = setInterval(fetchBalances, 10000); // Refresh every 10 seconds

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [publicKey, connection]);

  // useEffect(() => {
  //   const getTwitterProfile = async () => {
  //     const getTwitterId = JSON.parse(localStorage.getItem("id") || "null");
  //     const response = await axios.get(
  //       `https://ribh-store.vercel.app/api/v1/user/${getTwitterId}`
  //     );
  //     const { success, message, data } = response.data;
  //     setProfileObject(data);
  //   };

  // const HELIUS_RPC_URL =
  //   "https://rpc.helius.xyz?api-key=4facc46f-a686-4906-8283-45f08abb210f";
  // const connection = new Connection(HELIUS_RPC_URL);
  // const USDC_MINT_ADDRESS = new PublicKey(
  //   "EPjFWdd5AufqSSqeM2qZQDh1z1XkA9tcA1gSgKuG9x5w"
  // );
  // Fetch Wallet Transactions URL
  // useEffect(() => {
  //   if (!publicKey) {
  //     console.log("No publicKey found.");
  //     return;
  //   }
  //   setParseHistoryUrl(
  //     `https://api.helius.xyz/v0/addresses/${publicKey}/transactions?api-key=4facc46f-a686-4906-8283-45f08abb210f`
  //   );
  // }, [publicKey]);

  // useEffect(() => {
  //   const fetchBalances = async () => {
  //     console.log("Fetching balances...");
  //     console.log("PublicKey:", publicKey?.toBase58());
  //     console.log("Connection:", connection.rpcEndpoint);
  //     if (!connection || !publicKey) return;
  //     try {
  //       // Get associated token account for BONK
  //       const bonkTokenAccount = await getAssociatedTokenAddress(
  //         USDC_MINT_ADDRESS,
  //         publicKey
  //       );
  //       console.log("BONK Token Account:", bonkTokenAccount.toBase58());

  //       // Fetch BONK token balance
  //       const bonkAccountInfo = await connection.getTokenAccountBalance(
  //         bonkTokenAccount
  //       );
  //       console.log("BONK Account Info:", bonkAccountInfo);

  //       const bonkBalance = parseFloat(
  //         (bonkAccountInfo.value.amount / 10 ** 5).toFixed(5)
  //       ); // Amount is in the smallest unit
  //       setBonkBalance(bonkBalance);
  //     } catch (error) {
  //       console.error("Failed to fetch BONK balance:", error);

  //       // Attempt to create the associated token account if it doesn't exist
  //       try {
  //         const bonkTokenAccount = await createAssociatedTokenAccount(
  //           connection,
  //           publicKey,
  //           USDC_MINT_ADDRESS,
  //           publicKey
  //         );

  //         console.log(
  //           "Created BONK Token Account:",
  //           bonkTokenAccount.toBase58()
  //         );

  //         // Fetch BONK token balance again
  //         const bonkAccountInfo = await connection.getTokenAccountBalance(
  //           bonkTokenAccount
  //         );
  //         console.log("BONK Account Info:", bonkAccountInfo);

  //         const bonkBalance = bonkAccountInfo.value.amount; // Amount is in the smallest unit
  //         setBonkBalance(bonkBalance);
  //       } catch (creationError) {
  //         console.error("Failed to create BONK token account:", creationError);
  //         setBonkBalance(0);
  //       }
  //     }
  //   };

  //   fetchBalances();
  // }, [connection, publicKey]);

  // useEffect(()=>{
  //   const getTwitterProfile = async ()=>{
  //     const getTwitterId = JSON.parse(localStorage.getItem('id')|| "null");
  //     const response = await axios.get(`https://ribh-store.vercel.app/api/v1/user/${getTwitterId}`);
  //       const{success, message, data} = response.data;
  //       setProfileObject(data)
  //   };

  //   getTwitterProfile();
  // }, []);
  //   getTwitterProfile();
  // },[])

  useEffect(() => {
    const getUserTransactions = async () => {
      if (!publicKey) {
        toast.error("Please Connect wallet.", {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.ribh.xyz/api/v1/transaction?publicKey=${publicKey.toString()}&numTx=3`
        );
        const { data, success, message } = response.data;

        if (success) {
          dispatch(updateTransaction(data));
          dispatch(updateTransactionState(success));
          toast.success(message, {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          setError("Failed to fetch transactions.");
          toast.error("Failed to fetch transactions.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (err: any) {
        setError(err.message);
        toast.error("Failed to fetch transactions.", {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    getUserTransactions();
  }, [publicKey, dispatch]);

  console.log(publicKey);



//   useEffect(()=>{

// const network = "https://api.mainnet-beta.solana.com"; // Mainnet endpoint
// const connection = new Connection(network);

// const getUserTransactions = async ()=> {
//     console.log("this function works")
//     try {
//         const publicKeyVariable = new PublicKey(`${publicKey.toString()}`);
//         const balance = await connection.getBalance(publicKeyVariable);
//         console.log(balance,"balance");
//     } catch (error) {
//         console.error('Failed to get balance:', error);
//     }
// }
// getUserTransactions();
// ;
//   },[publicKey, dispatch])

  return (
    <>
      <div className="flex md:max-w-[406px] lg:w-[406px] flex-col items-start gap-4 h-full mxs:w-full">
        <div className=" relative flex w-full h-fit flex-col p-[16px_16px_16px_16px] items-start gap-1 self-stretch rounded-[16px] border border-[#7839EE] bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
          <div className="mx-auto relative flex w-[374px] mxs:w-[350px] mxxs:w-[310px] h-[200px] p-4 justify-end items-start gap-1 flex-shrink-0">
            <Image
              className="absolute "
              src={coverImage}
              alt={"coverImage"}
              fill
            />
          </div>
          <div className=" mx-auto relative flex w-[147px] flex-col items-center gap-2  top-[-50px]">
            <div className="relative w-[120px] h-[120px] rounded-[20px] pb-[20px]">
              <Image className="absolute" src={Logo} alt="profile" fill />
            </div>
            <div className=" relative flex flex-col justify-center items-center gap-2 self-stretch">
              <Typography>{shortenString(publicKey?.toString())}</Typography>
              <div className="flex p-2 px-3 items-center gap-2 rounded-[24px] bg-[#000] ">
                <Typography customClassName="text-white font-inter text-sm font-medium leading-normal">
                  {shortenString(publicKey?.toString())}
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
              <p>{usdcBalance}</p>
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
          style={{ backgroundImage: `url(${container.src})` }}
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
              onClick={() => router.push("/products/create-products")}
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
          {isTransactionSuccessful ? (
            <div className="w-full">
              {transactionData.map((items, index) => (
                <TableComp
                  key={index}
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
          )}

          {/* <div className="flex p-2 items-start gap-1 self-stretch">

                </div> */}
        </div>
      </div>
    </>
  );
}

export default Page;
