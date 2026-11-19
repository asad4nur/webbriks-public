// Tells Bing, Yandex and other IndexNow engines that the site changed: reads the live sitemap and submits every URL.
// Run after a deploy: `npm run indexnow`. The key file is public/<key>.txt (key also in lib/seo.ts).
const HOST = "webbriks.com";
const KEY = "b1c15b3952878689f5132a6d6a6cd604";

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("No URLs found in the sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
