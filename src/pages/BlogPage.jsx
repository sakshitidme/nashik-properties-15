import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/mockData';
import { Calendar, User, Clock, ArrowUpRight } from 'lucide-react';

export const BlogPage = () => {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Real Estate Insights & Analytics
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Nashik Property <span className="gold-gradient-text">Journal</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Market trends, legal buying guides, MahaRERA updates, and investment hotspot analysis in Nashik.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="glass-panel-gold rounded-3xl overflow-hidden border border-amber-500/30 flex flex-col justify-between group hover:border-amber-400 transition-all cursor-pointer"
          >
            <div className="h-52 relative overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-amber-500 text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                {post.category}
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] text-amber-300 font-mono">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-amber-400">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
