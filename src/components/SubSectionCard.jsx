import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '../sanity/client'

export default function SubSectionCard({ section, index }) {
  const title = section.title || 'PULC'
  const description = section.description || 'Promoting leadership and policy understanding among law students.'
  const imageUrl = section.image ? urlFor(section.image).url() : 'https://images.unsplash.com/photo-1575509545089-8dcb4e11cc7c?auto=format&fit=crop&q=80&w=600'
  const slug = section.slug?.current || 'pulc'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden shadow-lg h-80"
    >
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-navy-900/60 group-hover:bg-navy-900/40 transition-colors duration-500" />
      </div>
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-serif text-3xl font-bold mb-3">{title}</h3>
          <p className="text-gray-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
            {description}
          </p>
          <Link 
            to={`/sections/${slug}`}
            className="inline-flex items-center gap-2 bg-gold-600 hover:bg-gold-500 text-white px-6 py-2.5 rounded-md font-semibold transition-colors opacity-0 group-hover:opacity-100 duration-500 delay-200"
          >
            Explore Section
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
