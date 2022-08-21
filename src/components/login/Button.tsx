import { ReactNode } from "react";

interface buttonProps {
  type: "button" | "reset" | "submit" | undefined;
  children: ReactNode;
}

export const ButtonStyle =
  "min-w-[220px] max-w-sm hover:bg-hoverWhite customShadow font-Montserrat font-semibold my-1 rounded-md bg-white   py-2 uppercase  text-black   placeholder:text-gray-800 md:min-w-[330px]  ";
export const CommonButton = 
" rounded-md bg-white px-5  py-2  text-black shadow-md  placeholder:text-gray-800 ";

export const Button = (props: buttonProps) => {
  return (
    <button type={props.type} className={ButtonStyle}>
      {props.children}
    </button>
  );
};
