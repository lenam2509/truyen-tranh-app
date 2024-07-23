import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Manga } from "@/types";
import Image from "next/image";
import Link from "next/link";

type tag = {
  _id: number;
  slug: string;
  name: string;
};

type TsearchParams = {
  slug: string;
};

export default async function page({
  searchParams,
}: {
  searchParams: TsearchParams;
}) {
  const url = "https://otruyenapi.com/v1/api";
  const tagsData = await fetch(url + "/the-loai").then((res) => res.json());
  const truyensByTagsData = await fetch(
    url + "/the-loai/" + searchParams.slug
  ).then((res) => res.json());
  const truyensData = await fetch(url + "/danh-sach/truyen-moi").then((res) =>
    res.json()
  );
  const tags = tagsData.data.items;
  let truyens;

  if (searchParams.slug) {
    truyens = truyensByTagsData.data.items;
  } else {
    truyens = truyensData.data.items;
  }

  return (
    <div className="container py-4 mx-auto bg-[rgb(15,20,22)] min-h-screen text-white flex flex-col gap-4">
      <span className="font-bold text-2xl">Thể loại:</span>
      <ScrollArea className="h-[200px]  rounded-md border p-4 ">
        <div className="flex flex-wrap">
          <Button
            asChild
            className={`p-2 bg-red-500 m-2 font-bold rounded-lg w-fit text-white${
              !searchParams.slug ? " bg-blue-600" : ""
            }`}
          >
            <Link href={"/truyen-moi"}>tất cả</Link>
          </Button>
          {tags.map((tag: tag) => (
            <Button
              asChild
              key={tag._id}
              className={`p-2 bg-red-500 m-2 font-bold rounded-lg w-fit text-white${
                searchParams.slug === tag.slug ? " bg-blue-600" : ""
              }`}
            >
              <Link href={{ query: { slug: tag.slug } }}>{tag.slug}</Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {truyens.map((truyen: Manga) => (
          <Link key={truyen._id} href={`/detail/${truyen.slug}`}>
            <Card className="bg-transparent border-none">
              <div className="h-[200px] sm:h-[400px] md:h-[400px]  w-full bg-transparent ">
                <Image
                  src={`https://img.otruyenapi.com/uploads/comics/${truyen.thumb_url}`}
                  alt="/"
                  width={500}
                  height={500}
                  className="bg-red-500 w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="mt-4">
                <h2 className="font-bold text-md text-white text-center">
                  {truyen.name}
                </h2>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
