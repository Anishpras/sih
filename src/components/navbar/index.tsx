import Link from "next/link";
import { useRouter } from "next/router";
import { BurgerIcon } from "../icons/BurgerIcon";
import { NotificationIcon } from "../icons/NotificationIcon";
import { SearchIcon } from "../icons/SearchIcon";

interface NavBarProps {
  // headerData: { route: string; name: string }[];
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  headerTitle: string;
}
// export default function NavBar({ headerData, setToggleSidebar }: NavBarProps) {
//   return (
//     <div className="flex h-24 w-full items-center justify-start bg-secondary px-2 md:rounded-xl ">
//       <button
//         type="button"
//         className="fixed bottom-4 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full  bg-white  bg-opacity-20 text-white backdrop-blur backdrop-filter transition focus:outline-none focus-visible:ring lg:hidden"
//         onClick={() => setToggleSidebar((prevState: any) => !prevState)}
//       >
//         <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
//           <path
//             d="M4 6H20M4 12H20M4 18H11"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           ></path>
//         </svg>
//       </button>
//       {headerData!.map((n, index) => {
//         return (
//           <Link key={index} href={n.route}>
//             <button
//               type="button"
//               className="mx-2 rounded px-6 py-2 font-Montserrat text-xl font-semibold text-white "
//             >
//               {n.name}
//             </button>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

export const Header = ({ headerTitle, setToggleSidebar }: NavBarProps) => {
  const { asPath } = useRouter();
  console.log(asPath);
  return (
    <div className="style min-h-20 sticky top-0 z-10 m-auto flex w-full  flex-wrap px-4 py-4 pl-3 leading-[25.6px] filter backdrop-blur-[20px] md:w-[calc(100vw-240px)] md:justify-between  ">
      <div className="max-w-full">
        <nav className="font-Raleway  text-base ">
          <ol className="flex gap-2">
            <li className="flex gap-1 ">
              <Link href="/arbitration-centre">
                <span className="cursor-pointer hover:underline">Home</span>
              </Link>
              <span>/</span>
            </li>
            <li>
              <Link href={asPath}>
                <span className="cursor-pointer hover:underline">
                  {headerTitle}
                </span>
              </Link>
            </li>
          </ol>
        </nav>
        <div>
          <h1 className="font-Montserrat text-4xl font-semibold">
            {headerTitle}
          </h1>
        </div>
      </div>
      <div className=" px-4">
        <div className=" customShadow relative mt-3 flex w-full items-center justify-center rounded-3xl bg-white px-3  py-2 md:right-[6%] md:mt-0 md:w-[270px] md:max-w-full  ">
          <div className="flex items-center rounded-3xl bg-primaryWhite py-1 px-3 ">
            <button>
              <SearchIcon />
            </button>

            <input className="bg-transparent py-1 pl-3 focus:outline-none " />
          </div>
          <button
            type="button"
            className="px-1 md:hidden"
            onClick={() => setToggleSidebar((prevState: any) => !prevState)}
          >
            <BurgerIcon />
          </button>
          <button type="button" className="px-1 ">
            <NotificationIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
