import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BlogCard from '../components/BlogCard'
import SectionTitle from '../components/SectionTitle'
import { client } from '../sanity/client'
import { BLOGS_QUERY } from '../sanity/queries'

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(BLOGS_QUERY)
      .then((data) => {
        if (data && data.length > 0) setBlogs(data)
        else {
          setBlogs([
            { title: 'The Evolution of Constitutional Law', category: 'Law & Society' },
            { title: 'Intellectual Property in the Digital Age', category: 'Technology' },
            { title: 'Corporate Governance and Ethics', category: 'Corporate' },
            { title: 'Human Rights Post-2020', category: 'Human Rights' },
          ])
        }
      })
      .catch(() => {
         setBlogs([
          { title: 'The Evolution of Constitutional Law', category: 'Law & Society' },
          { title: 'Intellectual Property in the Digital Age', category: 'Technology' },
          { title: 'Corporate Governance and Ethics', category: 'Corporate' },
          { title: 'Human Rights Post-2020', category: 'Human Rights' },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-subtle min-h-screen pb-24">
      <div className="bg-navy-900 py-20 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold mb-4"
        >
          Blogs & Insights
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-2xl mx-auto px-4 text-lg"
        >
          Explore articles, opinions, and analyses written by our members and alumni.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        {loading ? (
          <div className="flex justify-center p-20">
             <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
