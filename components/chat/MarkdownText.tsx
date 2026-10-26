import { Fragment, type ReactNode } from "react";

// Safe mini-markdown for AI replies: **bold**, *italic*, `code`, [text](http/https url), bullet and numbered
// lists, paragraphs. It builds React nodes (never raw HTML), and links other than http(s) stay plain text.

const INLINE = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
const UL = /^\s*[-*]\s+(.*)$/;
const OL = /^\s*\d+\.\s+(.*)$/;

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined) nodes.push(<strong key={key++}>{m[2]}</strong>);
    else if (m[4] !== undefined) nodes.push(<em key={key++}>{m[4]}</em>);
    else if (m[6] !== undefined)
      nodes.push(
        <code key={key++} className="rounded bg-ink/[0.07] px-1 py-0.5 font-mono text-[12px]">
          {m[6]}
        </code>,
      );
    else if (/^https?:\/\//i.test(m[9]))
      nodes.push(
        <a
          key={key++}
          href={m[9]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-violet underline underline-offset-2 hover:text-brand-indigo"
        >
          {m[8]}
        </a>,
      );
    else nodes.push(m[0]);
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function MarkdownText({ text }: { text: string }) {
  const lines = (text ?? "").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const list = UL.test(line) ? UL : OL.test(line) ? OL : null;

    if (list) {
      const items: string[] = [];
      for (let m = list.exec(lines[i] ?? ""); m; m = list.exec(lines[i] ?? "")) {
        items.push(m[1]);
        i++;
      }
      const Tag = list === UL ? "ul" : "ol";
      blocks.push(
        <Tag key={blocks.length} className={`space-y-0.5 pl-5 ${list === UL ? "list-disc" : "list-decimal"}`}>
          {items.map((item, k) => (
            <li key={k}>{inline(item)}</li>
          ))}
        </Tag>,
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      const para: string[] = [];
      while (i < lines.length && lines[i].trim() !== "" && !UL.test(lines[i]) && !OL.test(lines[i])) para.push(lines[i++]);
      blocks.push(
        <p key={blocks.length}>
          {para.map((l, k) => (
            <Fragment key={k}>
              {k > 0 && <br />}
              {inline(l)}
            </Fragment>
          ))}
        </p>,
      );
    }
  }

  return <div className="space-y-1.5">{blocks}</div>;
}
