import { Link } from "react-router-dom";
import type { BlogPost } from "../data/blogs";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/5 bg-[#0D0D15] shadow-[0_24px_80px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:-translate-y-1">
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-[#E8C547]">
          <span>{post.date}</span>
          <span>{post.author}</span>
        </div>
        <div className="space-y-3">
          <Link
            to={`/blog/${post.slug}`}
            className="text-2xl font-semibold leading-tight text-[#F0EDE8] transition-colors duration-200 hover:text-[#E8C547]"
          >
            {post.title}
          </Link>
          <p className="text-sm leading-6 text-[#A9A3A0]">{post.description}</p>
        </div>
        <div className="mt-auto">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8C547] transition-colors duration-200 hover:text-[#F0EDE8]"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
