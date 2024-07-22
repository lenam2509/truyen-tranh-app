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

export default function NewestManga() {
  const [truyen, setTruyen] = useState<Manga[]>([]);
  const [url, setUrl] = useState(
    "https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=1"
  );

  const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    setTruyen(data.data.items);
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-white font-bold md:text-2xl">
          Truyện mới cập nhật
        </h2>
        <Link href={"/"} className="text-white">
          Xem tất cả &gt;
        </Link>
      </div>
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
              className=" md:basis-[30%] lg:basis-1/6 md:p-2 h-fit  mx-4"
            >
              <Link
                href={`/detail/${item.slug}`}
                className="flex flex-col items-center "
              >
                <div className="bg-black max-w-[200px] h-[300px]">
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
    </div>
  );
}
