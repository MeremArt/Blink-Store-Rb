import clsx from "clsx";
import { TypographyProps, variantMapping } from "./index.types";
import React from "react";
import { cva } from "class-variance-authority";

const typography = cva("", {
  variants: {
    intent: {
      h1: "text-h-xl mxs:text-h-l",
      h2: "text-h-l mxs:text-h-m",
      h3: "text-h-m mxs:text-h-r",
      h4: "text-h-r mxs:text-h-s",
      h5: "text-h-s mxs:text-h-xs",
      h6: "text-h-xs mxs:text-h-xxs",
      h7: "text-h-xxs mxs:text-h-xxxs",
      h8: "text-h-xxxs mxs:text-h-xxxxs",
      h9: "text-h-xxxxs mxs:text-h-xxs",
      h10: "text-eventMint mxs:text-h-xxs",
      //body variant
      "body-xl": "text-body-xl mxs:text-body-l",
      "body-l": "text-body-l mxs:text-body-m",
      "body-m": "text-body-m mxs:text-body-r",
      "body-r": "text-body-r mxs:text-body-s",
      "body-s": "text-body-s mxs:text-body-xs",
      "body-xs": "text-body-xs mxs:text-body-xxs",
      "body-xxs": "text-body-xxs mxs:text-body-xxxs",
      "body-xxxs":"text-body-xxxs mxs:text-body-xxs",
      "number":"text-number mxs:text-body-xl",
    },
    font: {
      Ubuntu: "Ubuntu",
      "open-sans": "open-sans",
    },
    color: {
        primary: "bg-primary-main",
        buttonColor:"text-buttonColor",
        fontgreenishColor:"text-fontgreenishColor",
        fontBodyMGreyishColor:"text-fontBodyMGreyishColor",
        fontBodyRGreyishColor:"text-fontBodyRGreyishColor",
        fontAvatarGreyishColor:"text-fontAvatarGreyishColor",
        fontBodyPurpishColor:'text-fontBodyPurpishColor',
        fontBodyWhiteishColor:"text-fontBodyWhiteishColor", 
        numberPurple:"text-numberPurple"   
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
    underline: { always: "underline", hover: "hover:underline", none: "" },
    align: {
      center: "text-center",
      start: "text-start",
      end: "text-end",
      left: "text-left",
      right: "text-right",
      justify: "text-justify",
    },
  },
  compoundVariants: [],
});

// Typography component
const Typography: React.FC<TypographyProps> = (props) => {
  const {
    variant = "body-r",
    tag,
    underline = "none",
    fontWeight,
    gutterBottom,
    noWrap,
    align = "left",
    color = "primary",
    customClassName = "",
    font,
    children,
    ...rest
  } = props;

  // Resolved tag
  const Tag = (tag ||
    variantMapping[variant] ||
    "p") as keyof JSX.IntrinsicElements;

  // Classes
  const className = clsx(
    gutterBottom && "mb-4",
    noWrap && "overflow-hidden text-ellipsis whitespace-nowrap"
  );

  return (
    <Tag
      className={typography({
        intent: variant,
        underline,
        fontWeight,
        color,
        align,
        font,
        className: `${customClassName} ${className} `,
      })}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export { Typography };

