"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import logo from "@/assets/images/Logo.svg";
import { Typography } from "@/components/typography";
import { Button } from "@/components/button";
import ArrowLeft from "@/assets/svg-comps/arrow-left";
import Twitter from "@/assets/svg-comps/twitter";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import CorrectCircle from "@/assets/svg-comps/correct-circle";

const ConnectAccount: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isTwitterSuccess, setIsTwitterSuccess] = useState(false);
  const [isProceed, setIsProceed] = useState(false);
  const router = useRouter();
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    const connectTwitter = async () => {
      const params = new URLSearchParams(window.location.search);
      const twitterUserId = params.get("twitterId");
      const getuserEmail = JSON.parse(localStorage.getItem("email") || "null");
      if (twitterUserId && getuserEmail) {
        try {
          console.log(getuserEmail, twitterUserId);
          const response = await axios.patch(
            `https://www.ribh.xyz/api/v1/auth/connect-twitter?twitterId=${twitterUserId}&email=${getuserEmail}`
          );

          if (response) {
            console.log(response);
            const { success, message, data } = response.data;
            const { _id } = data;
            setIsTwitterSuccess(success);
            localStorage.setItem("id", JSON.stringify(_id));
            toast.success(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            router.push("/verify-email/connect-accounts");
          }
        } catch (error) {
          console.error("Error connecting Twitter account:", error);
        }
      }
    };

    connectTwitter();
  }, [connected, publicKey]);

  useEffect(()=>{
    const sendPublicKey = async ()=>{
      // localStorage.setItem('publicKey', JSON.stringify(publicKey?.toString()));
      const getuserEmail = JSON.parse(localStorage.getItem("email") || "null");
      try{
        const response = await axios.patch(`https://www.ribh.xyz/api/v1/auth/connect-wallet?email=${getuserEmail}`,
          {
            'pubKey': publicKey?.toString(),
          }
        )
        console.log(response, "e work")
      }catch(err){
        console.log(err, 'e no work')
      }

    }

    sendPublicKey()
  },[])


  useEffect(() => {
    if (isTwitterSuccess && publicKey && connected) {
      setIsDisabled(false);
    }
  }, [isTwitterSuccess, publicKey, connected]);

  const verifyTwitter = async () => {
    setIsLoading(true);
    const getuserEmail = JSON.parse(localStorage.getItem("email") || "null");
    const url = `https://www.ribh.xyz/api/v1/auth/twitter?email=${getuserEmail}`;
    window.open(url, "_self");
  };

  const proceedToNext = () => {
    setIsProceed(true);
    setTimeout(() => {
      router.push("/overview");
    }, 2000);
    setIsProceed(false);
  };

  return (
    <div className="flex flex-col items-center gap-12 flex-[1_0_0] self-stretch max-w-[42rem] h-full">
      <div className="flex flex-col items-end gap-1 self-stretch">
        <Button
          label="Back to Home"
          leftIcon={<ArrowLeft />}
          fit
          size="smaller"
          customClassName="text-[#7839EE] mmd:text-white mxs:text-white mxs:bg-[#7839EE] mmd:bg-[#7839EE] font-Inter text-base mxs:text-[0.875rem] font-semibold leading-normal rounded-[2rem] border border-[#7839EE]"
          onClick={() => router.push("/verify-email/verify")}
        />
      </div>

      <div className="flex flex-col items-center justify-center border gap-4 p-[72px_54px_104px_54px] mxs:p-[32px_24px_12px_24px] self-stretch rounded-lg bg-white shadow-[0px_0px_32px_0px_rgba(0,0,0,0.08)] h-full">
        <div className="flex flex-col items-start  mxs:gap-4 self-stretch">
          <div className="flex flex-col items-center gap-8 mxs:gap-4 self-stretch">
            <div>
              <Image src={logo} alt="logo" width={86.733} height={86.733} />
            </div>
            <div className="flex flex-col gap-4 self-stretch text-center">
              <Typography customClassName="text-[#48258B] text-center font-Inter text-2xl mxs:text-[18px] font-semibold leading-normal">
                One last thing...
              </Typography>
              <Typography customClassName="text-[#5B5B5B] text-center font-Inter text-base  mxs:font-semi-bold font-medium leading-normal">
                Connect your Twitter/X account and Wallet to proceed
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch">
            <div className="flex flex-col justify-center items-center gap-1 py-4 self-stretch border-b">
              <Button
                label={
                  isTwitterSuccess ? "Account Connected" : "Connect Account"
                }
                leftIcon={<Twitter />}
                fit
                rightIcon={isTwitterSuccess && <CorrectCircle />}
                type="button"
                customClassName="flex w-[256px] h-[56px] px-8 py-4 justify-center mxs:text-[0.875rem] items-center gap-4 bg-[#000] rounded-[32px] text-white"
                onClick={verifyTwitter}
                loading={isLoading}
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-1 py-4 self-stretch">
              <WalletMultiButton />
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            label="Proceed"
            customClassName="flex h-[56px] px-6 py-4 justify-center items-center mxs:text-[0.875rem] gap-1 self-stretch rounded-[32px] bg-[#7839EE] text-white"
            disabled={isDisabled}
            onClick={proceedToNext}
            loading={isProceed}
          />
        </div>
      </div>

      <div className="flex items-end gap-4 self-stretch">
        <div className="rounded-[100px] bg-[linear-gradient(90deg,#7839EE_0%,#A27DFF_50.8%,#4E55FF_100%)] h-[12px] flex-[1_0_0]"></div>
        <div className="rounded-[100px] bg-[linear-gradient(90deg,#7839EE_0%,#A27DFF_50.8%,#4E55FF_100%)] h-[12px] flex-[1_0_0]"></div>
      </div>
    </div>
  );
};

export default ConnectAccount;
