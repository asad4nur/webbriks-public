import type { Metadata } from "next";

import LegalPage from "@/components/legal/LegalPage";
import { legalDoc } from "@/lib/legal";
import { seo } from "@/lib/seo";

const doc = legalDoc("nda");

export const metadata: Metadata = {
  title: `${doc.label} | Webbriks`,
  description: doc.summary,
  ...seo(`/${doc.slug}`),
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
