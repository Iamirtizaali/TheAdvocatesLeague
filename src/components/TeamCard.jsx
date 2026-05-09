import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'
import { urlFor } from '../sanity/client'

export default function TeamCard({ member, index }) {
  const name = member.name || 'John Doe'
  const role = member.role || 'President'
  const bio = member.bio || 'Dedicated to advancing legal discourse.'
  const imageUrl = member.image ? urlFor(member.image).url() : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  const linkedin = member.linkedin || null
  const facebook = member.facebook || null
  const instagram = member.instagram || null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden max-w-[280px] mx-auto w-full"
    >
      <Link to={`/team/${member.slug?.current || ''}`} className="absolute inset-0 z-10" aria-label={`View ${name}'s profile`} />
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-2 sm:p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-serif font-bold text-white text-sm sm:text-xl mb-0.5 sm:mb-1 leading-tight">{name}</h3>
        <p className="text-gold-500 font-medium text-[9px] sm:text-xs mb-1.5 sm:mb-3 uppercase tracking-wider">{role}</p>
        
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300">
          <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <div className="pt-1 sm:pt-2">
              <p className="text-gray-300 text-[10px] sm:text-xs mb-2 sm:mb-4 line-clamp-2 leading-tight">
                {bio}
              </p>
              <div className="flex gap-2">
                {linkedin && (
                  <a 
                    href={linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative z-20 inline-flex items-center justify-center p-1.5 sm:p-2 rounded-full bg-navy-800 hover:bg-gold-600 transition-colors"
                  >
                    <FaLinkedin size={14} className="sm:hidden" />
                    <FaLinkedin size={16} className="hidden sm:block" />
                  </a>
                )}
                {facebook && (
                  <a 
                    href={facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative z-20 inline-flex items-center justify-center p-1.5 sm:p-2 rounded-full bg-navy-800 hover:bg-gold-600 transition-colors"
                  >
                    <FaFacebook size={14} className="sm:hidden" />
                    <FaFacebook size={16} className="hidden sm:block" />
                  </a>
                )}
                {instagram && (
                  <a 
                    href={instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative z-20 inline-flex items-center justify-center p-1.5 sm:p-2 rounded-full bg-navy-800 hover:bg-gold-600 transition-colors"
                  >
                    <FaInstagram size={14} className="sm:hidden" />
                    <FaInstagram size={16} className="hidden sm:block" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
