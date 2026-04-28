import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowLeft } from 'lucide-react'
import { client, urlFor } from '../sanity/client'
import { EVENT_BY_SLUG_QUERY } from '../sanity/queries'
import { PortableText } from '@portabletext/react'

export default function EventDetail() {
  const { slug } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(EVENT_BY_SLUG_QUERY, { slug })
      .then((data) => {
        setEvent(data || {
          title: 'Sample Event Details',
          date: new Date().toISOString(),
          location: 'Main Auditorium',
          description: 'This is a fallback description for building the layout.',
          content: [],
        })
      })
      .catch(() => {
        setEvent({
          title: 'Sample Event Details',
          date: new Date().toISOString(),
          location: 'Main Auditorium',
          description: 'This is a fallback description for building the layout.',
          content: [],
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

  if (!event) return <div className="text-center py-20 text-xl font-bold">Event not found</div>

  const imageUrl = event.image ? urlFor(event.image).url() : 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200'
  const date = new Date(event.date || new Date())

  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null
        }
        return (
          <img
            alt={value.alt || ' '}
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
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={imageUrl} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy-900/60" />
        <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <Link to="/events" className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors mb-6 font-medium">
                <ArrowLeft size={20} /> Back to Events
              </Link>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="text-gold-500" />
                  <span>{date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-gold-500" />
                  <span>{event.location || 'Location TBA'}</span>
                </div>
              </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
          <div className="prose prose-lg max-w-none text-justify mx-auto prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-gold-600">
            {event.content && event.content.length > 0 ? (
              <PortableText value={event.content} components={components} />
            ) : (
              <div>
                <p className="lead text-xl text-gray-600 mb-6">{event.description}</p>
                <p>No further detailed content available for this event.</p>
              </div>
            )}
          </div>
          
          {event.gallery && event.gallery.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-12">
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-8 text-center">Event Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {event.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square overflow-hidden rounded-xl shadow-sm">
                    <img 
                      src={urlFor(img).width(600).height(600).fit('crop').url()} 
                      alt={`Gallery image ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
