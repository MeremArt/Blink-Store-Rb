import { LegacyRef } from "react";
import { UseFormRegister, FieldValues, Path ,ValidationRule} from "react-hook-form";

export interface InputProps<IFormValues extends FieldValues>
extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'required' | 'pattern'>{
  id?: string;
  label?: React.ReactNode | string;
  name: Path<IFormValues>;
  isSearchIcon?: boolean;
  hideErrorMsg?: boolean;
  errorMsg?: React.ReactNode | string;
  infoMsg?: React.ReactNode | string;
  successMsg?: React.ReactNode | string;
  register?: UseFormRegister<IFormValues>;
  required?: boolean | ValidationRule<boolean>;  
  customClassName?: string;
  ref?: LegacyRef<HTMLInputElement>;
  icon1?: React.ReactElement;
  icon2?: React.ReactElement;
  labelCustomClassName?: string;
  bgcolor?: string;
  maindiv?: string;
  validationPattern?: ValidationRule<RegExp>;
  message?: string;
  passwordWay?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  passwordFunc?: ()=>void;
  inputHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Updated type
  inputValue?: string |number| null| undefined;
}
