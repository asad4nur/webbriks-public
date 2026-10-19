import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomeLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-paper text-ink">
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
    </div>
  );
}
