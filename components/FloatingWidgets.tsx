"use client";

import { usePathname } from "next/navigation";

import BackToTop from "@/components/BackToTop";
import ChatWidget from "@/components/chat/ChatWidget";
import WhatsAppButton from "@/components/WhatsAppButton";

// The floating WhatsApp, chat and back-to-top buttons, on every page except the customer's private ticket page: that page is
// already a conversation with the team, so a second way to start one would only get in the way.
export default function FloatingWidgets() {
  const pathname = usePathname();
  if (pathname?.startsWith("/ticket/")) return null;
  return (
    <>
      <BackToTop />
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
