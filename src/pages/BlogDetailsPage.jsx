import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/mockData';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';

export const BlogDetailsPage = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  return (
    <div className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Articles</span>
      </Link>

      <div className="space-y-4">
        <span className="bg-amber-500 text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-amber-300 font-mono">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className="h-[400px] rounded-3xl overflow-hidden glass-panel border border-amber-500/30">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
        <p className="font-semibold text-white text-lg">{post.excerpt}</p>
        <p>
          Nashik's real estate ecosystem has experienced a massive shift over the past 36 months, driven by infrastructure expansions including the Samruddhi Mahamarg expressway, booming wine tourism, and an influx of corporate IT hubs in Pathardi and Satpur MIDC.
        </p>
        <h3 className="text-xl font-bold text-white pt-4">Key Investment Catalysts</h3>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Unprecedented appreciation along Gangapur Road and College Road corridors.</li>
          <li>Increased demand for luxury gated communities with 5-star lifestyle amenities.</li>
          <li>High rental yields driven by educational institutions and healthcare hubs.</li>
        </ul>
      </div>
    </div>
  );
};
