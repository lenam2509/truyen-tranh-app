import { Chapter } from "@/types";
import Image from "next/image";
import Link from "next/link";

const fetchChapter = async (id: string) => {
  const res = await fetch("https://sv1.otruyencdn.com/v1/api/chapter/" + id);
  const data = await res.json();
  return data.data;
};

export default async function page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const chapterData = fetchChapter(params.id);
  const { item }: { item: Chapter } = await Promise.resolve(chapterData);

  return (
    <div className="container py-4 mx-auto bg-[rgb(15,20,22)] min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <Link
          className="p-2 bg-red-400 font-bold"
          href={`/detail/${params.slug}`}
        >
          &lt; Trở lại
        </Link>
        <Link
          className="p-2 bg-red-400 font-bold"
          href={`/detail/${params.slug}`}
        >
          Xem tiếp &gt;
        </Link>
      </div>
      <div className="flex flex-col">
        <span className="text-green-500 text-center font-bold">
          Truyện lỗi thì F5 lại nha hihi
        </span>
        <h1 className="text-red-500 text-2xl text-center mb-4">
          {item.comic_name}
        </h1>
        {/* <h2 className="text-red-500 text-xl">{item.chapter_name}</h2> */}
        <div className="flex flex-col">
          {item.chapter_image.map((image, index) => (
            <Image
              width={500}
              height={500}
              key={index}
              src={`https://sv1.otruyencdn.com/${item.chapter_path}/${image.image_file}`}
              alt={item.chapter_name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <Link
          className="p-2 bg-red-400 font-bold"
          href={`/detail/${params.slug}`}
        >
          &lt; Trở lại
        </Link>
        <Link
          className="p-2 bg-red-400 font-bold "
          href={`/detail/${params.slug}`}
        >
          Xem tiếp &gt;
        </Link>
      </div>
    </div>
  );
}
