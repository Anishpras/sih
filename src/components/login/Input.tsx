import { forwardRef } from "react";

export const CustomInputStyle =
  "customShadow my-3  rounded-md bg-white px-6 py-2  text-start font-Montserrat font-medium text-xl placeholder:text-[1rem] font-semibold  hover:bg-hoverWhite w-full max-w-xs mx-1 ";

interface inputProps {
  placeholder: string;
  registerName: string;
  type: string;
  register: any;
}
export const Input = forwardRef(function input({
  type,
  placeholder,
  registerName,
  register,
}: inputProps) {
  return (
    <input
      className={CustomInputStyle}
      type={type}
      {...register(registerName)}
      placeholder={placeholder}
    />
  );
});
