import { Manga } from "@/types";
import Image from "next/image";
import Link from "next/link";

const fetchDetail = async (slug: string) => {
  const url = "https://otruyenapi.com/v1/api/truyen-tranh";
  const res = await fetch(`${url}/${slug}`);
  const data = await res.json();
  return data.data;
};

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const mangaData = fetchDetail(slug);
  const { item }: { item: Manga } = await Promise.resolve(mangaData);
  // const chapter_id = item.chapters[0].server_data[0].chapter_api_data
  //   .split("/")
  //   .pop();
  // console.log(chapter_id);

  return (
    <div className="container py-4 mx-auto bg-[rgb(15,20,22)] min-h-screen text-white flex flex-col justify-center">
      <div className="flex md:flex-row flex-col gap-8">
        <div className="md:w-[500px]">
          <Image
            src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`}
            width={1000}
            height={500}
            alt="img"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-red-500 text-2xl">{item.name}</h1>
          <span>Nội dung:</span>
          <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
          <span>Trạng thái: {item.status}</span>
          <span>Ngày cập nhật: {item.updatedAt}</span>
          <span>Tác giả: {item.author.join(", ")}</span>
          <span>
            Thể loại: {item.category.map((cat) => cat.name).join(", ")}
          </span>
          <div className="">
            <h2 className="text-red-500 text-xl">Danh sách chương</h2>
            <div className="">
              {item.chapters.map((chapter, index) => (
                <div key={index}>
                  <span>{chapter.server_name}</span>
                  <div className="flex flex-col h-[200px] overflow-auto">
                    {chapter.server_data.map((data, index) => (
                      <Link
                        key={index}
                        className="p-2 bg-red-400 my-4"
                        href={`/read/${slug}/${data.chapter_api_data
                          .split("/")
                          .pop()}`}
                      >
                        chương {data.chapter_name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
