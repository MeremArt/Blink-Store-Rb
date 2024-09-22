"use client";

import { Button } from "@/components/button";
import Description from "@/components/description";
import { Input } from "@/components/inputs";
import ProductImage from "@/components/product-image";
import { Typography } from "@/components/typography";
import test from "@/assets/images/test.jpeg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import WideIcon from "@/assets/svg-comps/wide-icon";
import DollarIcon from "@/assets/svg-comps/usdc";
import SuccessModal from "@/components/success-modal";
import progress2 from "@/assets/images/Progress2.svg";
import { useDispatch, useSelector } from "react-redux";
import PlaceHolder from "@/assets/images/placeholder.jpg";
import { toast } from "react-toastify";
import { resetProductPage } from "@/store/redux-slices/product-slice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { addEvent } from "@/store/redux-slices/event-slices";
import newPlaceholder from "@/assets/images/gallery.png";
import { formatString } from "@/app/overview/dummydata";

function Page() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [merchantId, setMerchantId] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const product = useSelector((state: any) => state.product);
  const event = useSelector((state: any) => state.event.events);

  const details = event && event.length > 0 ? event[0] : null;
  const blink = details?.blink || "";

  const dispatch = useDispatch();
  const router = useRouter();

  const { name, image, amount, description,quantity } = product;

  useEffect(() => {
    const getUserId = localStorage.getItem("publicKey");
    setMerchantId(getUserId);
  }, []);

  const checkState = () => {
    return name && description && amount > 0 && image;
  };







  const getState = checkState();
  console.log( amount, 'see')
  const submitEventForm = async () => {
    setIsLoading(true);
    // if (!getState) {
    //   console.error('Validation failed')
    //   setIsLoading(false)
    //   toast.error('Nothing to send')
    //   return
    // }
   const newAmount = formatString(amount)
    const formObject = {
      merchantId: merchantId,
      name: name,
      image: image,
      description: description,
      price: newAmount,
      amount:quantity,
    };

    try {
      const response = await axios.post(
        "https://www.ribh.xyz/api/v1/product",
        formObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      const { message, product, blink } = response.data.data;
      dispatch(addEvent({ product, blink }));
      dispatch(resetProductPage());
      toast.success("Product Created!");
      setShowModal(true);
      setIsLoading(false);
    } catch (err: any) {
      const errorMessage = err?.message || "An error occurred";
      console.log(err, "Error");

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/products/create-products');
  };

  return (
    <>
      {showModal && (
        <SuccessModal onClick={handleCloseModal} value={showModal} />
      )}
      <div className="mx-auto w-[826px] h-[48px] relative mmd:hidden">
        <Image className="absolute" src={progress2} alt={progress2} fill />
      </div>
      <div className=" mx-auto flex flex-col items-start lg:w-[826px] mmd:w-full px-[136px]  mxs:px-[24px] py-8 gap-8 mxs:gap-[1.5rem]  bg-[#FFF] shadow-[0_0_32px_0_rgba(0,_0,_0,_0.08)]">
        <div className="w-full">
          <Typography customClassName="text-black text-center text-[28px] mmd:text-[20px] font-semi-bold font-inter tracking[-0.014em]">
            Preview Product
          </Typography>
        </div>
        <div className="flex flex-col items-start gap-10 self-stretch">
          <div className="flex flex-col items-start gap-6 self-stretch">
            <div className="flex relative h-[326px] mxs:h-[240px] w-full items-start gap-1 self-stretch">
              <Image
                className="absolute rounded-[16px]"
                src={image ? image : newPlaceholder}
                alt="preview-image"
                fill
              />
              <div className="absolute w-full top-0 flex p-2 justify-end items-center gap-1 flex-1 ">
                <WideIcon />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 self-stretch">
              <Typography customClassName="text-[#5B5B5B] font-inter text-base  mxs:text-[0.875rem] font-normal leading-normal">
                Amount
              </Typography>
              <div className="flex flex-col items-start gap-2 self-stretch">
                <div className="flex items-center gap-2 self-stretch">
                  <DollarIcon />
                  <Typography className="text-[#000] font-inter text-xl font-semibold leading-normal">
                    {amount} USDC
                  </Typography>
                </div>
                <div>
                  <Typography className="text-[#A0A0A1] font-inter text-lg mxs:text-[1rem] font-normal leading-normal">
                    ≈ ${amount}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 self-stretch">
              <Typography className="text-[#5B5B5B] font-inter text-base mxs:text-[0.875rem] font-normal leading-normal">
                Product Name
              </Typography>
              <Typography className="text-[#000] font-inter text-lg font-medium leading-normal">
                {name}
              </Typography>
            </div>
            <div className="flex flex-col items-start gap-2 self-stretch">
              <Typography className="text-[#5B5B5B] font-inter text-base mxs:text-[0.875rem] font-normal leading-normal">
                Product Quantity
              </Typography>
              <Typography className="text-[#000] font-inter text-lg font-medium leading-normal">
                {quantity}
              </Typography>
            </div>
            <div className="flex flex-col items-start gap-2 self-stretch">
              <Typography className="text-[#5B5B5B] font-inter text-base  mxs:text-[0.875rem] font-normal leading-normal">
                Description
              </Typography>
              <Typography className="text-[#000] font-inter text-xl mxs:text-base font-medium leading-normal">
                {description}
              </Typography>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            label="Submit"
            loading={isLoading}
            customClassName="flex h-[56px] px-6 py-4 justify-center items-center gap-1 self-stretch bg-[#7839EE] rounded-[32px] text-white"
            onClick={submitEventForm}
          />
        </div>
      </div>
    </>
  );
}

export default Page;
