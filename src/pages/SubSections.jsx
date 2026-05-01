import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SubSectionCard from '../components/SubSectionCard'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { client } from '../sanity/client'
import { SUBSECTIONS_QUERY } from '../sanity/queries'

export default function SubSections() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(SUBSECTIONS_QUERY)
      .then((data) => {
        if (data && data.length > 0) setSections(data)
        else {
          setSections([
            { title: 'PULC', slug: { current: 'pulc' }, description: 'Promoting leadership and policy understanding.' },
            { title: 'Chapter', slug: { current: 'chapter' }, description: 'Local and regional chapters coordination.' },
            { title: 'Embassy Drive', slug: { current: 'embassy' }, description: 'Connecting students with international law bodies.' },
          ])
        }
      })
      .catch(() => {
        setSections([
          { title: 'PULC', slug: { current: 'pulc' }, description: 'Promoting leadership and policy understanding.' },
          { title: 'Chapter', slug: { current: 'chapter' }, description: 'Local and regional chapters coordination.' },
          { title: 'Embassy Drive', slug: { current: 'embassy' }, description: 'Connecting students with international law bodies.' },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-subtle min-h-screen pb-24">
      <SEO 
        title="Our Divisions | The Advocates' League"
        description="Explore the various divisions and sub-sections within The Advocates' League."
        url="https://theadvocatesleague.in/sections"
      />
      <div className="bg-navy-900 py-20 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold mb-4"
        >
          Our Divisions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-2xl mx-auto px-4 text-lg"
        >
          Discover the specialized branches of The Advocates' League that focus on various aspects of legal education.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        {loading ? (
          <div className="flex justify-center p-20">
             <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <SubSectionCard key={index} section={section} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
