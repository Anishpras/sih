import { forwardRef } from "react";

export const CustomInputStyle =
  "customShadow my-3 min-w-[200px] rounded-md bg-white px-6 py-2  text-start font-Montserrat  text-xl font-semibold  hover:bg-hoverWhite md:min-w-[330px] ";

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
