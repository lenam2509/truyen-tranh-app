type Category = {
  id: string;
  name: string;
  slug: string;
};

type Chapters = {
  server_name: string;
  server_data: [
    {
      filename: string;
      chapter_name: string;
      chapter_title: string;
      chapter_api_data: string;
    }
  ];
  // Thêm các thuộc tính khác của Chapter nếu có
};

type Chapter = {
  id: string;
  comic_name: string;
  chapter_name: string;
  chapter_path: string;
  chapter_image: [
    {
      image_page: number;
      image_file: string;
    }
  ];
};

type Manga = {
  category: Category[];
  chapters: Chapters[];
  name: string;
  origin_name: string[];
  slug: string;
  status: string;
  author: Array<string>;
  content: string;
  sub_docquyen: boolean;
  thumb_url: string;
  updatedAt: string;
  _id: string;
};

export type { Category, Chapters, Manga, Chapter };
