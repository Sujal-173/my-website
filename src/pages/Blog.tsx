import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BlogCard } from "../components/BlogCard";
import { blogs } from "../data/blogs";
import { useScrollToSection } from "../hooks/useScrollToSection";

const pageTitle = "Blog | Hotel Website Strategy & Development";
const pageDescription =
  "Read hospitality and small business website insights with modern, SEO-first blog posts that help hotels and brands convert more bookings.";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollToSection = useScrollToSection();
  const canonicalUrl =
    typeof window !== "undefined" ? `${window.location.origin}/blog` : "/blog";

  const featuredArticle = blogs[0];
  const matchingPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return blogs;
    }
    return blogs.filter((post) => {
      return [post.title, post.description, post.author, ...post.keywords]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [searchQuery]);

  return (
    <main className="relative min-h-screen bg-[#09090E] text-[#F0EDE8]">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="hotel website blog, direct booking, small business web design, Indore website developer"
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={featuredArticle.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={featuredArticle.image} />
      </Helmet>

      <section className="relative overflow-hidden border-b border-white/5 px-6 py-20 sm:px-10 lg:px-16">
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(232,197,71,0.2),_transparent_45%)]" />
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E8C547]">
              Insights for hotels &amp; businesses
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              SEO-led blog posts for hospitality, direct booking, and website
              growth.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[#A9A3A0]">
              Discover strategy, pricing, and conversion ideas for hotel
              websites, small business sites, and local brands.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <article className="group relative overflow-hidden rounded-[32px] bg-[#121217] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(232,197,71,0.14),_transparent_40%)]" />
              <div className="relative z-10 flex flex-col gap-4">
                <span className="text-sm uppercase tracking-[0.35em] text-[#E8C547]">
                  Featured article
                </span>
                <h2 className="text-3xl font-semibold leading-tight text-[#F0EDE8]">
                  {featuredArticle.title}
                </h2>
                <p className="max-w-xl text-sm leading-7 text-[#C5BEBA]">
                  {featuredArticle.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-[#A9A3A0]">
                  <span>{featuredArticle.date}</span>
                  <span>{featuredArticle.author}</span>
                </div>
                <Link
                  to={`/blog/${featuredArticle.slug}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8C547] px-5 py-3 text-sm font-semibold text-[#0C0C0A] transition-colors duration-200 hover:bg-[#f0d760]"
                >
                  Read featured story
                </Link>
              </div>
            </article>

            <div className="rounded-[32px] border border-white/5 bg-[#0D0D15] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <label
                htmlFor="blog-search"
                className="mb-2 block text-sm font-medium text-[#F0EDE8]"
              >
                Search blog posts
              </label>
              <input
                id="blog-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by topic, keyword or author"
                className="w-full rounded-[22px] border border-white/10 bg-[#121217] px-5 py-4 text-sm text-[#F0EDE8] outline-none transition focus:border-[#E8C547] focus:ring-2 focus:ring-[#E8C547]/20"
              />
              <div className="mt-8 space-y-4 text-sm leading-7 text-[#A9A3A0]">
                <p>
                  Fast blog access for hotel website owners, direct booking
                  strategy, and local business websites.
                </p>
                <p>
                  Every article is built with SEO, performance, and mobile-first
                  readability in mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between gap-4 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#E8C547]">
              Latest articles
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#F0EDE8]">
              Browse all blog posts
            </h2>
          </div>
          <p className="text-sm text-[#A9A3A0]">
            Showing {matchingPosts.length} of {blogs.length} stories.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {matchingPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {matchingPosts.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-[#0B0B11] p-10 text-center text-[#A9A3A0]">
            No posts matched your search. Try searching for hotel, website,
            bookings, or services.
          </div>
        )}
      </section>

      <section className="border-t border-white/5 bg-[#09090E] px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl rounded-[32px] bg-[#121217] p-10 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#E8C547]">
                Need a website for your hotel or business?
              </p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#F0EDE8]">
                Get a free consultation and a conversion-focused website plan.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A9A3A0]">
                I help hotels, restaurants, and local businesses build fast
                websites that capture direct bookings and qualified leads.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
        </div>
      </section>
    </main>
  );
}
