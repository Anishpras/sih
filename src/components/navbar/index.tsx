import Link from "next/link";

interface NavBarProps {
  headerData: { route: string; name: string }[];
}
export default function NavBar({ headerData }: NavBarProps) {
  return (
    <div className="flex h-24 w-full items-center justify-start rounded-xl bg-secondary px-2 ">
      {headerData.map((n, index) => {
        return (
          <Link key={index} href={n.route}>
            <button
              type="button"
              className="mx-2 rounded border px-6 py-2 font-semibold dark:border-gray-100 dark:text-gray-100"
            >
              {n.name}
            </button>
          </Link>
        );
      })}
    </div>
  );
}
