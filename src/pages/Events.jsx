import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import EventCard from '../components/EventCard'
import SectionTitle from '../components/SectionTitle'
import { client } from '../sanity/client'
import { EVENTS_QUERY } from '../sanity/queries'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(EVENTS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setEvents(data)
        } else {
          // Fallback mock data
          setEvents([
            { title: 'Annual Legal Moot Court', slug: { current: 'sample-event' } },
            { title: 'Seminar on Constitutional Amendments', slug: { current: 'sample-event' } },
            { title: 'Corporate Law Workshop', slug: { current: 'sample-event' } },
            { title: 'Intellectual Property Debate', slug: { current: 'sample-event' } },
          ])
        }
      })
      .catch((err) => {
        console.error(err)
        setEvents([
          { title: 'Annual Legal Moot Court', slug: { current: 'sample-event' } },
          { title: 'Seminar on Constitutional Amendments', slug: { current: 'sample-event' } },
          { title: 'Corporate Law Workshop', slug: { current: 'sample-event' } },
          { title: 'Intellectual Property Debate', slug: { current: 'sample-event' } },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-subtle min-h-screen pb-24">
      {/* Header */}
      <div className="bg-navy-900 py-20 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold mb-4"
        >
          Events
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-2xl mx-auto px-4 text-lg"
        >
          Join us at our upcoming events, seminars, and competitions.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        {loading ? (
          <div className="flex justify-center p-20">
             <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard key={index} event={event} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
