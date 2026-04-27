import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { urlFor } from '../sanity/client'
import { cn } from '../utils/cn'

export default function EventCard({ event, index }) {
  // Mock data fallback
  const title = event.title || 'Annual Legal Moot Court'
  const dateStr = event.date || '2026-10-15T09:00:00.000Z'
  const date = new Date(dateStr)
  const location = event.location || 'Main Auditorium, Law Dept'
  const description = event.description || 'Join us for the most awaited event of the year where top legal minds debate contemporary issues.'
  const imageUrl = event.image ? urlFor(event.image).url() : 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600'
  const slug = event.slug?.current || 'sample-event'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 z-20 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow-md">
          {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif font-bold text-xl text-navy-900 mb-2 line-clamp-2 title-hover">
          {title}
        </h3>
        
        <div className="flex flex-col gap-2 mb-4 text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gold-600" />
            <span>{date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gold-600" />
            <span className="truncate">{location}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
          {description}
        </p>
        
        <Link 
          to={`/events/${slug}`}
          className="inline-flex items-center gap-2 text-navy-900 font-semibold text-sm hover:text-gold-600 transition-colors mt-auto group/link"
        >
          View Details
          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
