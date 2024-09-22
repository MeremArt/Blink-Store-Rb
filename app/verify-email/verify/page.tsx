"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/Logo.svg";
import { Typography } from "@/components/typography";
import { Input } from "@/components/inputs";
import { Button } from "@/components/button";
import ArrowLeft from "@/assets/svg-comps/arrow-left";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

function Page() {
  const router = useRouter();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isUserOnWaitlist, setIsUserOnWaitlist] = useState<boolean>(false);

  const verifyEmail = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (!userEmail) {
      toast.error("Email cannot be empty");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://www.ribh.xyz/api/v1/user?email=${userEmail}`
      );

      const data = response?.data?.data;
      console.log(data, "response");

      if (data) {
        console.log("yes");
        const { email } = data;
        localStorage.setItem("email", JSON.stringify(email));
        toast.success(`Welcome ${email}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/verify-email/connect-accounts");
      } else {
        throw new Error("No data found for this email");
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.data) {
        const getMessage = err.response.data;
        const { message } = getMessage;
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/verify-email/login");
      }

      toast.error(err?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 flex-[1_0_0] self-stretch max-w-[42rem] h-full">
      <div className="flex flex-col items-end gap-1 self-stretch ">
        {/* <Button label='Back to Home' leftIcon={<ArrowLeft/>} fit size="small" customClassName=" text-[#7839EE] font-Inter text-base mxs:text-[0.875rem] font-semi-bold leading-normal rounded-[2rem] border border-[#7839EE] mmd:bg-[#7839EE] mmd:text-white "/> */}
      </div>

      <div className="flex flex-col items-start gap-14 mxs:gap-10  p-[72px_54px_104px_54px] mxs:p-[32px_24px_12px_24px] self-stretch rounded-lg bg-white shadow-[0px_0px_32px_0px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col items-center gap-10 mxs:gap-[20px] self-stretch">
          <div>
            <Image src={logo} alt="logo" width={86.733} height={86.733} />
          </div>
          <div className="flex flex-col gap-8 mxs:gap-4 self-stretch text-center">
            <Typography customClassName=" text-[#48258B] text-center font-Inter text-2xl mxs:text-[18px] font-semi-bold leading-normal">
              We’ll need to verify if you are on the waitlist
            </Typography>
            <Typography customClassName="text-[#5B5B5B] text-center font-Inter text-base mxs:font-semi-bold font-medium leading-normal">
              Input your email address below
            </Typography>
          </div>
        </div>
        <form
          className="flex flex-col items-start gap-16 mxs:gap-10 self-stretch"
          onSubmit={verifyEmail}
        >
          <div className="w-full ">
            <Input
              name="Email address"
              label="Email address"
              placeholder="new.user@mail.com"
              passwordWay={false}
              onChange={(e: any) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Button
              label="Verify Email"
              type="submit"
              loading={isloading}
              size="small"
              customClassName="bg-[#7839EE] rounded-[2rem] mxs:text-[0.875rem] text-white"
            />
          </div>
        </form>
      </div>

      <div className="flex items-end gap-4 flex-[1_0_0] self-stretch">
        <div className="rounded-[100px] bg-[linear-gradient(90deg,#7839EE_0%,#A27DFF_50.8%,#4E55FF_100%)] h-[12px] flex-[1_0_0]"></div>
        <div className="rounded-[100px] bg-[#EDEDED] h-[12px] flex-[1_0_0]"></div>
      </div>
    </div>
  );
}

export default Page;
