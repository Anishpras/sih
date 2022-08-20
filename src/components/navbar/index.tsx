import Link from "next/link";

interface NavBarProps {
  headerData: { route: string; name: string }[];
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function NavBar({ headerData, setToggleSidebar }: NavBarProps) {
  return (
    <div className="flex h-24 w-full items-center justify-start bg-secondary px-2 md:rounded-xl ">
      <button
        type="button"
        className="fixed bottom-4 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full  bg-white  bg-opacity-20 text-white backdrop-blur backdrop-filter transition focus:outline-none focus-visible:ring lg:hidden"
        onClick={() => setToggleSidebar((prevState: any) => !prevState)}
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      {headerData!.map((n, index) => {
        return (
          <Link key={index} href={n.route}>
            <button
              type="button"
              className="mx-2 rounded px-6 py-2 font-semibold text-white font-Montserrat text-xl "
            >
              {n.name}
            </button>
          </Link>
        );
      })}
    </div>
  );
}
