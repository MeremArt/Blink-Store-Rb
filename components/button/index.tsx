import React from "react";
import { cva } from "class-variance-authority";
import { ButtonProps } from "./index.types";
import { CircularLoader } from "../circular-loader";
import cn from "../utils";

const button = cva("", {
  variants: {
    variant: {
      filled: "text-secondary-100",
      outlined: "!bg-white border",
      transparent: "!bg-transparent border",
      text: "!bg-transparent",
    },
    size: {
      large: "py-5 px-12",
      medium: "px-8 py-3.5",
      small: "px-6 py-4",
      smaller: "py-[16px] px-[16px]",
      moreMedium: "px-12 py-4",
      footer: "py-2 px-10",
      "medium-with-icon": "px-8 py-3.5 pl-5",
      none: "px-[16px] py-[12px]",
      total: 'p-[12px]'
    },
    color: {
      primary: "bg-primary-main",
      buttonColor: "bg-buttonColor",
      fontgreenishColor: "bg-fontgreenishColor",
      fontBodyMGreyishColor: "bg-fontBodyMGreyishColor",
      fontBodyRGreyishColor: "bg-fontBodyRGreyishColor",
      fontAvatarGreyishColor: "bg-fontAvatarGreyishColor",
      fontBodyPurpishColor: "bg-fontBodyPurpishColor",
      fontBodyWhiteishColor: "bg-fontBodyWhiteishColor",
    },
    fontWeight: {
      thin: "font-thin",
      "extra-light": "font-extra-light",
      light: "font-light",
      regular: "font-regular",
      medium: "font-medium",
      "semi-bold": "font-semi-bold",
      bold: "font-bold",
      "extra-bold": "font-extra-bold",
      black: "font-black",
    },
  },
});

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant,
    color = "primary",
    label = "",
    leftIcon,
    rightIcon,
    loading = false,
    customClassName = "",
    children,
    fontWeight = "semi-bold",
    fit,
    size = "large",
    ...rest
  } = props;

  return (
    <button
      className={button({
        variant,
        color,
        size,
        fontWeight,
        className: cn(
          "flex items-center gap-2 justify-center whitespace-nowrap transition-all duration-300 focus:ring-4 focus:ring-primary-light-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:!border-gray-3 disabled:bg-gray-3",
          customClassName,
          fit ? "w-fit" : "w-full",
          rest.disabled ?"bg-[#BFBFBF] text-white":""
        ),
      })}
      type="button"
      {...rest}
    >
      {leftIcon && (
        <span className={cn(rest.disabled && "[&>path]:stroke-gray-3")}>
          {leftIcon}
        </span>
      )}

      {loading ? (
        <CircularLoader
          customClassName={cn(
            "relative flex items-center justify-center",
            rest.disabled && "opacity-50 !text-primary-main/50"
          )}
        />
      ) : (
        <>
          {label || children}
          {rightIcon && (
            <span className={cn(rest.disabled && "[&>path]:stroke-gray-3")}>
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export { Button };
