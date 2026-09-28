import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { client, urlFor } from '../sanity/client'
import { CHAPTERS_QUERY } from '../sanity/queries'

export default function Chapters() {
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(CHAPTERS_QUERY)
      .then((data) => {
        if (data && data.length > 0) setChapters(data)
        else {
          setChapters([
            { title: 'Lahore Chapter', slug: { current: 'lahore' }, description: 'Coordinating campuses in Lahore.' },
            { title: 'Sahiwal Chapter', slug: { current: 'sahiwal' }, description: 'Coordinating campuses in Sahiwal.' },
            { title: 'Ambassadors Program', slug: { current: 'ambassadors' }, description: 'Connecting student ambassadors.' },
          ])
        }
      })
      .catch(() => {
        setChapters([
            { title: 'Lahore Chapter', slug: { current: 'lahore' }, description: 'Coordinating campuses in Lahore.' },
            { title: 'Sahiwal Chapter', slug: { current: 'sahiwal' }, description: 'Coordinating campuses in Sahiwal.' },
            { title: 'Ambassadors Program', slug: { current: 'ambassadors' }, description: 'Connecting student ambassadors.' },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-subtle min-h-screen pb-24">
      <SEO 
        title="Our Chapters | The Advocates' League"
        description="Explore the various chapters and branches of The Advocates' League."
        url="https://theadvocatesleague.com/chapters"
      />
      <div className="bg-navy-900 py-20 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold mb-4"
        >
          Our Chapters
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-2xl mx-auto px-4 text-lg"
        >
          Discover the specialized branches of The Advocates' League that focus on various regional and ambassadorship programs.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        {loading ? (
          <div className="flex justify-center p-20">
             <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden bg-gray-100 relative">
                  {chapter.image ? (
                    <img 
                      src={urlFor(chapter.image).width(600).height(400).url()} 
                      alt={chapter.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-navy-900/10 flex items-center justify-center">
                      <span className="text-4xl font-serif text-navy-900/30 font-bold">{chapter.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-navy-900 mb-2 font-serif group-hover:text-gold-600 transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3 text-sm leading-relaxed">
                    {chapter.description}
                  </p>
                  <Link 
                    to={`/chapters/${chapter.slug?.current}`}
                    className="inline-flex items-center text-gold-600 font-semibold hover:text-navy-900 transition-colors text-sm mt-auto"
                  >
                    Explore Chapter <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
