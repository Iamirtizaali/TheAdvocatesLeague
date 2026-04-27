import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { urlFor } from '../sanity/client'

export default function BlogCard({ blog, index }) {
  const title = blog.title || 'The Evolution of Constitutional Law'
  const excerpt = blog.excerpt || 'Exploring the dynamic nature of constitutional interpretations over the past century.'
  const author = blog.author || 'Jane Doe'
  const publishedAtStr = blog.publishedAt || new Date().toISOString()
  const date = new Date(publishedAtStr)
  const imageUrl = blog.image ? urlFor(blog.image).url() : 'https://images.unsplash.com/photo-1505664159854-23285de84815?auto=format&fit=crop&q=80&w=600'
  const slug = blog.slug?.current || 'sample-blog'
  const category = blog.category || 'Law & Society'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <Link to={`/blogs/${slug}`} className="block relative h-56 overflow-hidden rounded-t-xl">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-navy-900 text-white text-xs font-bold px-3 py-1 rounded shadow-md">
          {category}
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-3 gap-4">
          <span className="font-medium text-gold-600">{author}</span>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        <Link to={`/blogs/${slug}`}>
          <h3 className="font-serif font-bold text-xl text-navy-900 mb-3 line-clamp-2 hover:text-gold-600 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {excerpt}
        </p>
        <Link 
          to={`/blogs/${slug}`}
          className="mt-auto inline-flex items-center gap-2 text-navy-900 font-semibold text-sm hover:text-gold-600 transition-colors group/btn"
        >
          Read Article
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
