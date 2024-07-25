"use client";

import { Manga } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [searchResult, setSearchResult] = useState<string>("");
  const [searchData, setSearchData] = useState<Manga[]>([]);
  const url = "https://otruyenapi.com/v1/api/tim-kiem?keyword=" + searchResult;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setSearchResult("");
      return;
    }
    setSearchResult(e.target.value);
    // debounce
    setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setSearchData(data.data.items);
        });
    }, 1000);
  };

  //   when click outside the search bar, the search result will disappear
  const handleClickOutside = (e: any) => {
    if (e.target.value !== searchResult) {
      setSearchResult("");
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        onChange={handleChange}
        value={searchResult}
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
      {searchResult.length > 0 && (
        <div className="w-[200px] h-[200px] overflow-auto md:w-full bg-white absolute top-[50px] text-black flex flex-col rounded-lg">
          {searchData.map((manga, index) => (
            <Link
              key={index}
              className="w-full p-4 border-b border-b-red-500 hover:bg-slate-500 hover:text-white font-bold"
              href={`/detail/${manga.slug}`}
            >
              <span>{manga.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
