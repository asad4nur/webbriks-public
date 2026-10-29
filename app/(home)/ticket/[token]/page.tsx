import type { Metadata } from "next";
import { Suspense } from "react";

import TicketStatus from "./_sections/TicketStatus";

// Private to whoever holds the link we email: keep it out of search results.
export const metadata: Metadata = {
  title: "Your ticket | Webbriks",
  description: "See where your Webbriks support ticket stands.",
  robots: { index: false, follow: false },
  // The link is the key to this ticket: never pass it on in a Referer header.
  referrer: "no-referrer",
};

async function Loader({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <TicketStatus token={token} />;
}

export default function TicketPage({ params }: PageProps<"/ticket/[token]">) {
  return (
    <main className="flex-1 bg-paper px-4 pt-32 pb-20 sm:pt-40">
      <Suspense fallback={<div className="mx-auto h-64 max-w-5xl animate-pulse rounded-3xl bg-white ring-1 ring-ink/[0.07]" />}>
        <Loader params={params} />
      </Suspense>
    </main>
  );
}
