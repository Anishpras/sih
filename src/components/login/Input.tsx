import { forwardRef } from "react";

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
        className="my-3 min-w-[200px] rounded-md border border-white bg-transparent px-6  py-2 text-center  shadow placeholder:text-center  placeholder:text-sm placeholder:font-light  placeholder:sm:text-lg md:min-w-[330px] "
        type={type}
        {...register(registerName)}
        placeholder={placeholder}
      />
    );
  });
  