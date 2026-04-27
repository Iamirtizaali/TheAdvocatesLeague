import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { client, urlFor } from '../sanity/client'
import { SUBSECTION_BY_SLUG_QUERY } from '../sanity/queries'
import { PortableText } from '@portabletext/react'

export default function SubSectionDetail() {
  const { slug } = useParams()
  const [section, setSection] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(SUBSECTION_BY_SLUG_QUERY, { slug })
      .then((data) => {
        setSection(data || {
          title: slug.toUpperCase(),
          description: 'Explore the mission and initiatives of this division.',
          content: []
        })
      })
      .catch(() => {
        setSection({
          title: slug.toUpperCase(),
          description: 'Explore the mission and initiatives of this division.',
          content: []
        })
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-subtle">
        <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!section) return <div className="text-center py-20 text-xl font-bold">Section not found</div>

  const imageUrl = section.image ? urlFor(section.image).url() : 'https://images.unsplash.com/photo-1575509545089-8dcb4e11cc7c?auto=format&fit=crop&q=80&w=1200'

  return (
    <div className="bg-subtle min-h-screen pb-24">
      <div className="relative h-[40vh] min-h-[300px]">
        <img src={imageUrl} alt={section.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy-900/70" />
        <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <Link to="/sections" className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors mb-6 font-medium">
                <ArrowLeft size={20} /> Back to Divisions
              </Link>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                {section.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl">{section.description}</p>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-16 mt-8">
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-12 border border-gray-100 max-w-5xl mx-auto">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-gold-600">
            {section.content && section.content.length > 0 ? (
              <PortableText value={section.content} />
            ) : (
              <div>
                <h2>Welcome to {section.title}</h2>
                <p>This division of The Advocates League is dedicated to specialized aspects of legal development. We organize focused workshops, seminars, and networking sessions.</p>
                <p>Content will be updated soon from the CMS.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/contact" className="px-8 py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-md transition-colors shadow-lg inline-flex items-center gap-2">
            Join This Division
          </Link>
        </div>
      </div>
    </div>
  )
}
