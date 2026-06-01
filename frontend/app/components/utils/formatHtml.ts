// utils/formatHtml.ts
import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";

export const formatHtml = (html: string) => {
  // Return original HTML during SSR to prevent errors
  if (typeof window === "undefined") return html;

  return prettier.format(html, {
    parser: "html",
    plugins: [parserHtml],
  });
};
