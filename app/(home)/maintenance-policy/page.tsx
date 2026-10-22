import type { Metadata } from "next";

import LegalPage from "@/components/legal/LegalPage";
import { legalDoc } from "@/lib/legal";

const doc = legalDoc("maintenance-policy");

export const metadata: Metadata = { title: `${doc.label} | Webbriks`, description: doc.summary };

export default function Page() {
  return <LegalPage doc={doc} />;
}
