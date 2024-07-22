import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import HoanThanh from "@/components/HoanThanh";
import NewestManga from "@/components/NewestManga";
import DangPhatHanh from "@/components/OnProducts";

export default function Home() {
  return (
    <div className="container py-4 mx-auto bg-[rgb(15,20,22)] min-h-screen">
      <HeroSection />
      <NewestManga />
      <ComingSoon />
      <DangPhatHanh />
      <HoanThanh />
    </div>
  );
}
