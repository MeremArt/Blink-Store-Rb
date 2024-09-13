import { TypographyFontWeight } from '../typography/index.types';

export enum ButtonVariants {
  filled = 'filled',
  outlined = 'outlined',
  text = 'text',
  transparent = 'transparent',
}

export type ButtonColors =
| 'buttonColor'
| "fontgreenishColor"
| "fontBodyMGreyishColor"
| "fontBodyRGreyishColor"
| "fontAvatarGreyishColor"
| "fontBodyPurpishColor"
| "fontBodyWhiteishColor"
| 'primary';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof ButtonVariants;
  color?: ButtonColors;
  label?: React.ReactNode | string;
  hideLabel?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fontWeight?: TypographyFontWeight;
  customClassName?: string;
  fit?: boolean;
  size?: 'large' | 'medium' | 'medium-with-icon'| 'small'| 'moreMedium' | "footer" |"none"|"smaller" | "total";
}
