export type Report = {
  /** Path under /public. All report images are cropped to the same 1200×460 canvas. */
  image: string;
  width: number;
  height: number;
  title: string;
  detail: string;
};

// REAL screenshots only, exported from Meta Ads Manager with client permission.
// Crop to the "Performance overview" card on a 1200×460 white canvas, hide account names and IDs,
// save to public/reports/ and add an entry below. With no entries the section hides itself.
export const reports: Report[] = [
  {
    image: "/reports/meta-report-1.webp",
    width: 1200,
    height: 460,
    title: "462 website purchases",
    detail: "$1.85 per purchase · $852.82 spent",
  },
  {
    image: "/reports/meta-report-3.webp",
    width: 1200,
    height: 460,
    title: "441 website purchases",
    detail: "$1.86 per purchase · $819.66 spent",
  },
  {
    image: "/reports/meta-report-2.webp",
    width: 1200,
    height: 460,
    title: "176 website purchases",
    detail: "$1.56 per purchase · $274.91 spent",
  },
];
