import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TeamCard from '../components/TeamCard'
import SEO from '../components/SEO'
import { client } from '../sanity/client'
import { TEAM_MEMBERS_QUERY } from '../sanity/queries'

export default function Team() {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(TEAM_MEMBERS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setTeam(data)
        } else {
          // Fallback mock data
          setTeam([
            { name: "Eleanor Vance", role: "President", bio: "Leading the society with a vision for comprehensive legal education and practical skill development." },
            { name: "Liam Chen", role: "Vice President", bio: "Coordinating events and ensuring smooth execution of all society activities." },
            { name: "Sarah Jenkins", role: "General Secretary", bio: "Managing communications and official society affairs." },
            { name: "David Osei", role: "Treasurer", bio: "Handling finances and sponsorships for our major events." },
            { name: "Maya Patel", role: "Head of Research", bio: "Overseeing all legal publications and research initiatives." },
            { name: "James Wilson", role: "Head of Competitions", bio: "Organizing internal moots and external competition representations." },
          ])
        }
      })
      .catch((err) => {
        console.error(err)
        // Fallback mock data
        setTeam([
          { name: "Eleanor Vance", role: "President", bio: "Leading the society with a vision for comprehensive legal education and practical skill development." },
          { name: "Liam Chen", role: "Vice President", bio: "Coordinating events and ensuring smooth execution of all society activities." },
          { name: "Sarah Jenkins", role: "General Secretary", bio: "Managing communications and official society affairs." },
          { name: "David Osei", role: "Treasurer", bio: "Handling finances and sponsorships for our major events." },
          { name: "Maya Patel", role: "Head of Research", bio: "Overseeing all legal publications and research initiatives." },
          { name: "James Wilson", role: "Head of Competitions", bio: "Organizing internal moots and external competition representations." },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-subtle min-h-screen pb-24">
      <SEO 
        title="Our Team | The Advocates' League"
        description="Meet the dedicated executive team and members leading The Advocates' League."
        url="https://theadvocatesleague.in/team"
      />
      {/* Header */}
      <div className="bg-navy-900 py-20 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold mb-4"
        >
          Our Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-2xl mx-auto px-4 text-lg"
        >
          Meet the dedicated individuals working behind the scenes to make The Advocates' League a success.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        {loading ? (
          <div className="flex justify-center p-20">
            <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {team.map((member, index) => (
              <TeamCard key={index} member={member} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
