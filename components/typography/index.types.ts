export const variantMapping = {
    h1: "h1",
    h2: "h1",
    h3: "h1",
    h4: "h1",
    h5: "h1",
    h6: "h1",
    h7: "h1",
    h8: "h1",
    h9: "h1",
    h10:'h1',
    "body-xl": "p",
    "body-l": "p",
    "body-m": "p",
    "body-r": "p",
    "body-s": "p",
    "body-xs": "p",
    "body-xxs": "p",
    "body-xxxs": "p",
    'number':"p",
    
  };
  
  export type TypographyVariant = keyof typeof variantMapping;
  
  export type TypographyColors =
    | 'buttonColor'
    | "fontgreenishColor"
    | "fontBodyMGreyishColor"
    | "fontBodyRGreyishColor"
    | "fontAvatarGreyishColor"
    | "fontBodyPurpishColor"
    | "fontBodyWhiteishColor"
    | 'primary'
    | 'numberPurple'
    ;
  
  export type TypographyAlign =
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify";
  
  export type TypographyFontWeight =
    | "thin"
    | "extra-light"
    | "light"
    | "regular"
    | "medium"
    | "semi-bold"
    | "bold"
    | "extra-bold"
    | "black";
  
  export type TypographyFont = "Ubuntu" | "open-sans";
  
  export interface TypographyProps
    extends React.HTMLAttributes<HTMLOrSVGElement> {
    tag?: keyof JSX.IntrinsicElements;
    variant?: TypographyVariant;
    color?: TypographyColors;
    fontWeight?: TypographyFontWeight;
    align?: TypographyAlign;
    noWrap?: boolean;
    underline?: "none" | "always" | "hover";
    customClassName?: string;
    children?: React.ReactNode;
    font?: TypographyFont;
    [x: string]: any;
  }
  