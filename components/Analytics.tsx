import Script from "next/script";

// Google Analytics 4. Loads only when NEXT_PUBLIC_GA_ID (the G-… measurement ID) is set on Vercel.
// Page changes inside the site are counted by GA4's enhanced measurement (browser history events).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// AI assistants that send visitors here, matched on the referrer host or utm_source. A visit from one is also sent
// as an `ai_referral` event with `ai_source`, so GA4 can report AI traffic on its own.
const AI_SOURCES: [string, string][] = [
  ["chatgpt.com|chat.openai.com|openai.com", "ChatGPT"],
  ["perplexity.ai", "Perplexity"],
  ["gemini.google.com|bard.google.com", "Gemini"],
  ["copilot.microsoft.com|edgeservices.bing.com", "Copilot"],
  ["claude.ai", "Claude"],
  ["deepseek.com", "DeepSeek"],
  ["grok.com|x.ai", "Grok"],
  ["meta.ai", "Meta AI"],
  ["you.com", "You.com"],
  ["phind.com", "Phind"],
];

// Runs once per page load, after the config, so the event always goes to this property.
const aiReferral = `(function(){var s=${JSON.stringify(AI_SOURCES)};var h="";try{h=document.referrer?new URL(document.referrer).hostname:""}catch(e){}
var u=(new URLSearchParams(location.search).get("utm_source")||"").toLowerCase();
function m(v,d){return v&&d.split("|").some(function(x){return v===x||v.slice(-x.length-1)==="."+x})}
for(var i=0;i<s.length;i++){if(m(h,s[i][0])||m(u,s[i][0])){gtag("event","ai_referral",{ai_source:s[i][1],landing_page:location.pathname});break}}})();`;

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');${aiReferral}`}
      </Script>
    </>
  );
}
