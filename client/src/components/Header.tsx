"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Header() {
  const pathName = usePathname();
  const Links = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả", url: "/all" },
    { name: "Manga", url: "/manga" },
    { name: "Manhwa", url: "/manhwa" },
    { name: "Top Truyện", url: "/top" },
  ];
  return (
    <header className="bg-[rgb(15,20,22)] text-white">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <Link className="w-[100px] md:w-[150px]" href={"/"}>
          <Image
            src={"/logo.png"}
            width={1000}
            height={100}
            className="w-full h-full object-cover"
            alt="logo"
          />
        </Link>
        {/* links */}
        <div className="items-center gap-5 hidden lg:flex">
          {Links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className={`${
                pathName === link.url
                  ? "text-red-300"
                  : "text-white hover:text-red-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm truyện"
            className="bg-white text-black rounded p-2 outline-none w-[150px]  md:w-[300px] xl:w-[400px]"
          />
          <button className="absolute right-0 top-0 bottom-0 text-black px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        {/* menu for mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 lg:hidden cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-[rgb(15,20,22)] text-white">
            <SheetTitle className="text-white">Menu</SheetTitle>
            <SheetDescription>Chọn một trong các mục sau:</SheetDescription>
            {
              <div className="flex flex-col gap-4 mt-4">
                {Links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    className={`p-2 border-b border-b-white ${
                      pathName === link.url
                        ? "text-red-500"
                        : "text-white hover:text-red-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            }
          </SheetContent>
        </Sheet>

        {/* login */}
        <div className="hidden lg:block">
          <Link
            href={"/login"}
            className="bg-red-500 font-bold text-white px-3 py-2 rounded"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  );
}
