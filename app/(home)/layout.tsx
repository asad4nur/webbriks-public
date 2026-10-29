import { Suspense } from "react";

import FloatingWidgets from "@/components/FloatingWidgets";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomeLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-paper text-ink">
      <Navbar />
      {children}
      <Footer />
      {/* usePathname() is request-time data: the buttons stream in after the page is prerendered. */}
      <Suspense fallback={null}>
        <FloatingWidgets />
      </Suspense>
    </div>
  );
}
