import { useMemo } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getBlogBySlug, blogs } from "../data/blogs";
import { useScrollToSection } from "../hooks/useScrollToSection";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogPost() {
  const { slug } = useParams();
  const location = useLocation();
  const scrollToSection = useScrollToSection();
  const blog = useMemo(() => getBlogBySlug(slug ?? ""), [slug]);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonicalUrl = `${origin}${location.pathname}`;

  const relatedPosts = useMemo(
    () => blogs.filter((item) => item.slug !== slug).slice(0, 3),
    [slug],
  );

  const tableOfContents = useMemo(() => {
    if (!blog) return [];
    return Array.from(blog.content.matchAll(/^##\s*(.+)$/gm)).map((match) => ({
      id: slugify(match[1]),
      title: match[1],
    }));
  }, [blog]);

  const readingTime = useMemo(() => {
    if (!blog) return 0;
    const words = blog.content.split(/\s+/).filter(Boolean).length;
    return Math.max(2, Math.ceil(words / 200));
  }, [blog]);

  const contentBlocks = useMemo(() => {
    if (!blog) return [];
    return blog.content
      .trim()
      .split(/\n\n+/)
      .map((block) => {
        if (block.startsWith("## ")) {
          const title = block.replace(/^## /, "");
          return {
            type: "heading",
            title,
            id: slugify(title),
          };
        }
        if (block.trim().startsWith("- ")) {
          return {
            type: "list",
            items: block
              .split(/\n/)
              .filter((line) => line.trim().startsWith("- "))
              .map((line) => line.replace(/^- /, "")),
          };
        }
        return {
          type: "paragraph",
          text: block,
        };
      });
  }, [blog]);

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#09090E] px-6 py-24 text-[#F0EDE8] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-[#0B0B11] p-10 text-center shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
          <h1 className="text-3xl font-semibold">Article not found</h1>
          <p className="mt-4 text-sm leading-7 text-[#A9A3A0]">
            The blog you are looking for may have moved or does not exist yet.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex rounded-full bg-[#E8C547] px-6 py-3 text-sm font-semibold text-[#0C0C0A] transition hover:bg-[#f0d760]"
          >
            Visit the blog page
          </Link>
        </div>
      </main>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    image: [blog.image],
    author: {
      "@type": "Person",
      name: blog.author,
    },
    datePublished: blog.date,
    description: blog.description,
    url: canonicalUrl,
  };

  return (
    <main className="relative min-h-screen bg-[#09090E] text-[#F0EDE8]">
      <Helmet>
        <title>{blog.title} | Sujal Patidar</title>
        <meta name="description" content={blog.description} />
        <meta name="keywords" content={blog.keywords.join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        <meta name="twitter:image" content={blog.image} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative overflow-hidden border-b border-white/5 px-6 pt-20 pb-12 sm:px-10 lg:px-16">
        <div className="absolute left-0 top-0 h-52 w-full bg-[radial-gradient(circle_at_top_left,_rgba(232,197,71,0.14),_transparent_35%)]" />
        <div className="mx-auto max-w-6xl">
          <div className="space-y-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.35em] text-[#E8C547] transition hover:text-[#F0EDE8]"
            >
              ← Back to blog
            </Link>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#A9A3A0]">
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.author}</span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[32px] border border-white/5 bg-[#121217] shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
            <img
              src={blog.image}
              alt={blog.title}
              loading="lazy"
              className="h-[360px] w-full object-cover"
            />
            <div className="grid gap-10 px-6 py-10 lg:grid-cols-[1fr_300px] lg:px-10">
              <div className="space-y-8">
                {contentBlocks.map((block, index) => {
                  if (block.type === "heading") {
                    return (
                      <h2
                        key={index}
                        id={block.id}
                        className="text-2xl font-semibold leading-tight text-[#F0EDE8]"
                      >
                        {block.title}
                      </h2>
                    );
                  }
                  if (block.type === "list") {
                    return (
                      <ul key={index} className="space-y-3 pl-5 text-[#C5BEBA]">
                        {block.items?.map((item, itemIndex) => (
                          <li key={itemIndex} className="list-disc leading-7">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={index}
                      className="text-base leading-8 text-[#C5BEBA]"
                    >
                      {block.text}
                    </p>
                  );
                })}

                <div className="rounded-[28px] border border-white/10 bg-[#0D0D15] p-8">
                  <h3 className="text-2xl font-semibold text-[#F0EDE8]">
                    Need help with a website for your hotel or business?
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#A9A3A0]">
                    Get a free website strategy call and a proposal crafted for
                    your property, service, or local brand.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    {/* Fixed: was <Link to="/#contact"> which doesn't scroll — now uses useScrollToSection */}
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center rounded-full bg-[#E8C547] px-6 py-3 text-sm font-semibold text-[#0C0C0A] transition hover:bg-[#f0d760]"
                    >
                      Contact Me
                    </button>
                    <a
                      href="https://wa.me/918827039565"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-[#E8C547] px-6 py-3 text-sm font-semibold text-[#E8C547] transition hover:bg-white/5"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-[#101017] p-8">
                  <h3 className="text-2xl font-semibold text-[#F0EDE8]">
                    Continue exploring
                  </h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {/* Fixed: was <Link to="/#contact"> — now uses useScrollToSection */}
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="rounded-2xl border border-white/10 bg-[#0D0D15] px-5 py-4 text-sm font-semibold text-[#E8C547] transition hover:bg-white/5 text-left"
                    >
                      Contact page
                    </button>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="rounded-2xl border border-white/10 bg-[#0D0D15] px-5 py-4 text-sm font-semibold text-[#F0EDE8] transition hover:bg-white/5 text-left"
                    >
                      Services page
                    </button>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-[#0F1017] p-8">
                  <h3 className="text-2xl font-semibold text-[#F0EDE8]">
                    More articles
                  </h3>
                  <div className="mt-6 space-y-3">
                    {relatedPosts.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/blog/${item.slug}`}
                        className="block rounded-2xl border border-white/10 bg-[#121217] px-5 py-4 text-sm text-[#C5BEBA] transition hover:border-[#E8C547] hover:text-[#F0EDE8]"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="space-y-8 rounded-[28px] border border-white/10 bg-[#0D0D15] p-6 text-[#C5BEBA] shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#E8C547]">
                    In this article
                  </p>
                  <nav aria-label="Table of contents" className="mt-4 space-y-3">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block rounded-2xl px-3 py-3 text-sm transition hover:bg-white/5 hover:text-[#F0EDE8]"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#E8C547]">
                    Share this post
                  </p>
                  <div className="mt-4 grid gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(canonicalUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-white/10 bg-[#121217] px-4 py-3 text-sm text-[#F0EDE8] transition hover:border-[#E8C547]"
                    >
                      Share on Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-white/10 bg-[#121217] px-4 py-3 text-sm text-[#F0EDE8] transition hover:border-[#E8C547]"
                    >
                      Share on LinkedIn
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
