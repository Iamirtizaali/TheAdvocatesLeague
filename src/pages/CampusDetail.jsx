import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'
import TeamCard from '../components/TeamCard'
import { client, urlFor } from '../sanity/client'
import { CAMPUS_BY_SLUG_QUERY, CAMPUS_TEAM_QUERY } from '../sanity/queries'
import { PortableText } from '@portabletext/react'

export default function CampusDetail() {
  const { slug } = useParams()
  const [campus, setCampus] = useState(null)
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [year, setYear] = useState('2026-27')

  useEffect(() => {
    setLoading(true)
    Promise.all([
      client.fetch(CAMPUS_BY_SLUG_QUERY, { slug }),
      client.fetch(CAMPUS_TEAM_QUERY, { campusSlug: slug, year })
    ])
      .then(([campusData, teamData]) => {
        setCampus(campusData || null)
        setTeam(teamData || [])
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [slug, year])

  if (loading && !campus) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-subtle">
        <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!campus && !loading) return <div className="text-center py-20 text-xl font-bold">Campus not found</div>

  const imageUrl = campus?.image ? urlFor(campus.image).url() : 'https://images.unsplash.com/photo-1575509545089-8dcb4e11cc7c?auto=format&fit=crop&q=80&w=1200'

  return (
    <div className="bg-subtle min-h-screen pb-24">
      <SEO 
        title={`${campus?.title || ''} | The Advocates' League`}
        description={campus?.description || `Learn more about the ${campus?.title} campus.`}
        image={imageUrl}
        url={`https://theadvocatesleague.com/campuses/${slug}`}
      />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px]">
        <img src={imageUrl} alt={campus?.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy-900/70" />
        <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              {campus?.chapterRef && (
                <Link to={`/chapters/${campus.chapterRef.slug?.current || ''}`} onClick={(e) => {
                    if (!campus.chapterRef.slug?.current) {
                        e.preventDefault();
                        window.history.back();
                    }
                }} className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors mb-6 font-medium">
                  <ArrowLeft size={20} /> Back
                </Link>
              )}
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                {campus?.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl">{campus?.description}</p>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-16 mt-8">

        {/* Campus Team Section */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-navy-900">Campus Team</h2>
            
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <span className="text-gray-600 font-medium">Tenure Year:</span>
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent font-medium shadow-sm cursor-pointer"
              >
                <option value="2026-27">2026-27</option>
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
              <p className="text-gray-500 text-lg">No campus team members found for {year}.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}
