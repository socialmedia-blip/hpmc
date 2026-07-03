import ArticleClient from "./ArticleClient";

interface ArticleType {
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  datePublished: string;
  content: string;
  slug: string;
  category?: string;
  schemaMarkup?: string[];
}

interface RelatedArticleType {
  title: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  datePublished: string;
}

async function getarticle(slug: string): Promise<ArticleType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/article/viewarticle`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch article");

  const articles: ArticleType[] = await res.json();
  const found = articles.find((b) => b.slug === slug);
  if (!found) throw new Error("article not found");

  return found;
}

async function getRelatedarticles(slug: string): Promise<RelatedArticleType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/article/related/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  return res.json();
}

// ✅ Metadata works here
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const { slug } = await params;
//   const article = await getarticle(slug);

//   return {
//     title: article.title,
//     description: article.excerpt,
//     alternates: {
//       canonical: `https://www.khalsapropertydealers.com/articles/${article.slug}`,
//     },
//     openGraph: {
//       title: article.title,
//       description: article.excerpt,
//       type: "article",
//       url: `https://www.khalsapropertydealers.com/articles/${article.slug}`,
//       images: [{ url: article.coverImage }],
//       siteName: "KPD",
//       locale: "en_IN",
//     },
//   };
// }

// ✅ Server component
export default async function ArticleDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getarticle(slug);
  const relatedarticles = await getRelatedarticles(slug);

  return <ArticleClient article={article} relatedarticles={relatedarticles} />;
}

