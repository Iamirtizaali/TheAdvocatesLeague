import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'
import SEO from '../components/SEO'
import { client, urlFor } from '../sanity/client'
import { TEAM_MEMBER_BY_SLUG_QUERY } from '../sanity/queries'
import { PortableText } from '@portabletext/react'

export default function TeamMemberDetail() {
  const { slug } = useParams()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(TEAM_MEMBER_BY_SLUG_QUERY, { slug })
      .then((data) => {
        setMember(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-subtle">
        <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!member) return <div className="text-center py-20 text-xl font-bold">Team member not found. Make sure their slug is generated in Sanity.</div>

  const imageUrl = member.image ? urlFor(member.image).url() : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600'
  const linkedin = member.linkedin || null
  const facebook = member.facebook || null
  const instagram = member.instagram || null

  return (
    <div className="bg-subtle min-h-screen pb-24">
      <SEO 
        title={`${member.name} | The Advocates' League`}
        description={member.bio || `View the profile of ${member.name}, ${member.role} at The Advocates' League.`}
        image={imageUrl}
        url={`https://theadvocatesleague.com/team/${slug}`}
      />
      
      <div className="bg-navy-900 py-16 text-center text-white relative">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-left max-w-4xl">
          <Link to="/team" className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors mb-6 font-medium">
            <ArrowLeft size={20} /> Back to Team
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-1/3 aspect-[4/5] rounded-xl overflow-hidden shadow-md shrink-0"
            >
              <img src={imageUrl} alt={member.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-2/3"
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-2">{member.name}</h1>
              <h2 className="text-xl text-gold-600 font-semibold mb-6 uppercase tracking-wider">{member.role}</h2>
              
              <div className="flex gap-4 mb-8">
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-navy-50 text-navy-900 hover:bg-gold-500 hover:text-white rounded-full transition-colors">
                    <FaLinkedin size={22} />
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-navy-50 text-navy-900 hover:bg-gold-500 hover:text-white rounded-full transition-colors">
                    <FaFacebook size={22} />
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-navy-50 text-navy-900 hover:bg-gold-500 hover:text-white rounded-full transition-colors">
                    <FaInstagram size={22} />
                  </a>
                )}
              </div>

              <div className="prose prose-lg text-gray-700">
                <p className="whitespace-pre-line text-justify leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
