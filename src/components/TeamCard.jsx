import { motion } from 'framer-motion'
import { FaLinkedin } from 'react-icons/fa'
import { urlFor } from '../sanity/client'

export default function TeamCard({ member, index }) {
  const name = member.name || 'John Doe'
  const role = member.role || 'President'
  const bio = member.bio || 'Dedicated to advancing legal discourse.'
  const imageUrl = member.image ? urlFor(member.image).url() : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  const linkedin = member.linkedin || '#'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-serif font-bold text-2xl mb-1">{name}</h3>
        <p className="text-gold-500 font-medium text-sm mb-3 uppercase tracking-wider">{role}</p>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {bio}
          </p>
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-full bg-navy-800 hover:bg-gold-600 transition-colors"
            >
              <FaLinkedin size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
