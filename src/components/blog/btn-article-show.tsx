import Link from "next/link";

export const BtnArticleShow = ({ id }: { id: number }) => {
  const href = `/novinky/${id ?? ""}`;

  return (
    <Link
      className="dark:text-white px-4 py-1 justify-center dark:hover:bg-slate-600 duration-500 ease-in-out transition-colors flex self-center border-[1px] rounded-full dark:border-gray-600 border-gray-300"
      href={href}
    >
      podrobnosti
    </Link>
  );
};
