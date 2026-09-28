import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'
import TeamCard from '../components/TeamCard'
import { client, urlFor } from '../sanity/client'
import { CHAPTER_BY_SLUG_QUERY, CAMPUSES_BY_CHAPTER_QUERY, CHAPTER_TEAM_QUERY } from '../sanity/queries'
import { PortableText } from '@portabletext/react'
import { motion } from 'framer-motion'

export default function ChapterDetail() {
  const { slug } = useParams()
  const [chapter, setChapter] = useState(null)
  const [campuses, setCampuses] = useState([])
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [year, setYear] = useState('2026-27')

  useEffect(() => {
    setLoading(true)
    Promise.all([
      client.fetch(CHAPTER_BY_SLUG_QUERY, { slug }),
      client.fetch(CAMPUSES_BY_CHAPTER_QUERY, { chapterSlug: slug }),
      client.fetch(CHAPTER_TEAM_QUERY, { chapterSlug: slug, year })
    ])
      .then(([chapterData, campusesData, teamData]) => {
        setChapter(chapterData || {
          title: slug.toUpperCase(),
          description: 'Explore the mission and initiatives of this chapter.',
          content: []
        })
        setCampuses(campusesData || [])
        setTeam(teamData || [])
      })
      .catch((err) => {
        console.error(err)
        setChapter({
          title: slug.toUpperCase(),
          description: 'Explore the mission and initiatives of this chapter.',
          content: []
        })
      })
      .finally(() => setLoading(false))
  }, [slug, year])

  if (loading && !chapter) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-subtle">
        <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!chapter && !loading) return <div className="text-center py-20 text-xl font-bold">Chapter not found</div>

  const imageUrl = chapter?.image ? urlFor(chapter.image).url() : 'https://images.unsplash.com/photo-1575509545089-8dcb4e11cc7c?auto=format&fit=crop&q=80&w=1200'

  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null
        return (
          <img
            alt={value.alt || 'Division Detail Image'}
            loading="lazy"
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            className="rounded-lg shadow-md my-8 mx-auto"
          />
        )
      }
    }
  }

  return (
    <div className="bg-subtle min-h-screen pb-24">
      <SEO 
        title={`${chapter?.title || ''} | The Advocates' League`}
        description={chapter?.description || `Learn more about the ${chapter?.title} chapter.`}
        image={imageUrl}
        url={`https://theadvocatesleague.com/chapters/${slug}`}
      />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px]">
        <img src={imageUrl} alt={chapter?.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy-900/70" />
        <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <Link to="/chapters" className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors mb-6 font-medium">
                <ArrowLeft size={20} /> Back to Chapters
              </Link>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                {chapter?.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl">{chapter?.description}</p>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-16 mt-8">
        
        {/* Content Section */}
        {chapter?.content && chapter.content.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-16 border border-gray-100 max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none text-justify mx-auto prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-gold-600">
              <PortableText value={chapter.content} components={components} />
            </div>
          </div>
        )}

        {/* Campuses Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-navy-900 mb-8 text-center">Campuses</h2>
          {campuses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campuses.map((campus, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden bg-gray-100 relative">
                    {campus.image ? (
                      <img 
                        src={urlFor(campus.image).width(600).height(400).url()} 
                        alt={campus.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-navy-900/10 flex items-center justify-center">
                        <span className="text-4xl font-serif text-navy-900/30 font-bold">{campus.title.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-navy-900 mb-2 font-serif group-hover:text-gold-600 transition-colors">
                      {campus.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3 text-sm leading-relaxed">
                      {campus.description}
                    </p>
                    <Link 
                      to={`/campuses/${campus.slug?.current}`}
                      className="inline-flex items-center text-gold-600 font-semibold hover:text-navy-900 transition-colors text-sm mt-auto"
                    >
                      View Campus <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No campuses added yet for this chapter.</p>
          )}
        </div>

        {/* Supervisory Team Section */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-navy-900">Supervisory Team</h2>
            
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <span className="text-gray-600 font-medium">Tenure Year:</span>
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent font-medium shadow-sm cursor-pointer"
              >
                <option value="2026-27">2026-27</option>
                <option value="2025-26">2025-26</option>
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
              </select>
            </div>
          </div>

          {loading ? (
             <div className="flex justify-center p-10">
               <div className="w-10 h-10 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
             </div>
          ) : team.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <TeamCard key={index} member={member} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-500 text-lg">No supervisory team members found for {year}.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}
