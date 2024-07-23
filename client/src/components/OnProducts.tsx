"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Manga } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function DangPhatHanh() {
  const [truyen, setTruyen] = useState<Manga[]>([]);
  const [url, setUrl] = useState(
    "https://otruyenapi.com/v1/api/danh-sach/dang-phat-hanh?page=1"
  );
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    setTruyen(data.data.items);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-white font-bold md:text-2xl">
          Truyện đang phát hành
        </h2>
        <Link href={"/"} className="text-white">
          Xem tất cả &gt;
        </Link>
      </div>
      {loading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 animate-spin text-center"
        >
          <path
            fillRule="evenodd"
            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
        >
          <CarouselContent>
            {truyen.map((item) => (
              <CarouselItem
                key={item._id}
                className="basis-[200px] md:basis-[30%] lg:basis-1/6 md:p-2 h-fit  mx-4"
              >
                <Link
                  href={`/detail/${item.slug}`}
                  className="flex flex-col items-center "
                >
                  <div className="bg-black w-full md:h-[300px]">
                    <Image
                      src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`}
                      alt={item.name}
                      width={1000}
                      height={0}
                      className="object-cover w-full h-full rounded-lg "
                    />
                  </div>
                  <h3 className="font-bold text-lg text-red-500 text-center mt-2">
                    {item.name}
                  </h3>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-20px] top-[150px] bg-green-400 hover:bg-slate-400" />
          <CarouselNext className=" right-[-20px]  lg:right-[20px] top-[150px] bg-green-400 hover:bg-slate-400" />
        </Carousel>
      )}
    </div>
  );
}
