import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="min-h-[500px] text-white flex md:flex-row flex-col justify-center items-center gap-4">
      <div className="md:w-1/2">
        <h1 className="font-bold text-2xl md:text-5xl mb-2">
          Chào mừng tới web đọc truyện của lenam2509
        </h1>
        <p className="text-xl">
          Web này được xây dựng bởi lenam2509, một người yêu thích truyện tranh
          và lập trình.
        </p>
      </div>
      <div className="md:w-1/2 flex items-center justify-center">
        <Image
          src="/hero.png"
          width={1000}
          height={0}
          alt="img"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
