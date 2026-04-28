import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Scale, Users, Calendar, BookOpen } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import EventCard from '../components/EventCard'
import BlogCard from '../components/BlogCard'
import SubSectionCard from '../components/SubSectionCard'
import { client, urlFor } from '../sanity/client'
import { HOME_QUERY, EVENTS_QUERY, BLOGS_QUERY, SUBSECTIONS_QUERY } from '../sanity/queries'

export default function Home() {
  const [data, setData] = useState({
    home: null,
    events: [],
    blogs: [],
    sections: []
  })
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const length = data.home?.heroImages?.length > 0 ? data.home.heroImages.length : 3;
        return (prev + 1) % length;
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [data.home?.heroImages])

  useEffect(() => {
    async function fetchData() {
      try {
        const [homeData, eventsData, blogsData, sectionsData] = await Promise.all([
          client.fetch(HOME_QUERY),
          client.fetch(EVENTS_QUERY),
          client.fetch(BLOGS_QUERY),
          client.fetch(SUBSECTIONS_QUERY)
        ])
        
        setData({
          home: homeData || {
            heroTitle: 'Fostering Excellence in Legal Education',
            heroSubtitle: 'The Advocates\\' League is a premier student-run organization dedicated to advancing legal discourse, advocacy skills, and professional development.',
            missionStatement: 'To create a vibrant community of legal scholars who are well-equipped to tackle contemporary justice challenges.',
          },
          events: eventsData && eventsData.length > 0 ? eventsData.slice(0, 3) : [{}, {}, {}],
          blogs: blogsData && blogsData.length > 0 ? blogsData.slice(0, 3) : [{}, {}, {}],
          sections: sectionsData && sectionsData.length > 0 ? sectionsData.slice(0, 3) : [{}, {}, {}]
        })
      } catch (error) {
        console.error("Error fetching data:", error)
        // Set mock data on error so it still looks good
        setData({
          home: {
            heroTitle: 'Fostering Excellence in Legal Education',
            heroSubtitle: 'The Advocates\\' League is a premier student-run organization dedicated to advancing legal discourse, advocacy skills, and professional development.',
            missionStatement: 'To create a vibrant community of legal scholars who are well-equipped to tackle contemporary justice challenges.',
          },
          events: [{}, {}, {}],
          blogs: [{}, {}, {}],
          sections: [{title: 'PULC'}, {title: 'Chapter'}, {title: 'Embassy Drive'}]
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-subtle">
        <div className="w-16 h-16 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  const { home, events, blogs, sections } = data
  const defaultImages = [
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1505664159854-23285de84815?auto=format&fit=crop&q=80&w=1920'
  ]
  const heroImages = home?.heroImages?.length > 0 
    ? home.heroImages.map(img => urlFor(img).url()) 
    : defaultImages

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] py-24 md:py-32 flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img 
              key={currentSlide}
              src={heroImages[currentSlide]}
              alt="Hero Background Slide" 
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-navy-900/70 z-10"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-600/20 border border-gold-500/30 text-gold-500 font-semibold text-sm mb-6 uppercase tracking-wider backdrop-blur-sm">
                <Scale size={16} />
                Welcome to The Advocates\\' League
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                {home.heroTitle}
              </h1>
              <p className="text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
                {home.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link to="/about" className="w-full sm:w-auto text-center px-8 py-4 bg-gold-600 hover:bg-gold-500 text-white font-semibold rounded-md transition-colors shadow-lg hover:shadow-gold-500/30">
                  Discover Our Mission
                </Link>
                <Link to="/contact" className="w-full sm:w-auto text-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-navy-900 text-white font-semibold rounded-md transition-colors">
                  Get Involved
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="py-20 bg-white relative -mt-16 z-20 mx-4 lg:mx-8 rounded-xl shadow-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-6"
            >
              <div className="w-16 h-16 mx-auto bg-navy-50 rounded-full flex items-center justify-center mb-6">
                <Users size={32} className="text-gold-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy-900 mb-3">500+ Members</h3>
              <p className="text-gray-600">A growing community of passionate legal scholars and practitioners.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="px-6 md:border-x border-gray-100"
            >
              <div className="w-16 h-16 mx-auto bg-navy-50 rounded-full flex items-center justify-center mb-6">
                <Calendar size={32} className="text-gold-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy-900 mb-3">Annual Events</h3>
              <p className="text-gray-600">Hosting prestigious moot courts, negotiation competitions, and seminars.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-6"
            >
              <div className="w-16 h-16 mx-auto bg-navy-50 rounded-full flex items-center justify-center mb-6">
                <BookOpen size={32} className="text-gold-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy-900 mb-3">Publications</h3>
              <p className="text-gray-600">Publishing high-quality legal research and contemporary case analyses.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subsections Showcase */}
      <section className="py-24 bg-subtle">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionTitle 
              title="Our Divisions" 
              subtitle="The Advocates\\' League operates through specialized divisions to maximize our impact."
              className="text-left mb-0"
            />
            <Link to="/sections" className="hidden md:inline-flex items-center gap-2 text-gold-600 font-semibold hover:text-gold-700 transition-colors">
              View All Divisions <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <SubSectionCard key={index} section={section} index={index} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/sections" className="inline-flex items-center gap-2 text-gold-600 font-semibold hover:text-gold-700 transition-colors">
              View All Divisions <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle 
            title="Upcoming & Recent Events" 
            subtitle="Participate in our curated academic and professional events."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard key={index} event={event} index={index} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/events" className="px-8 py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-md transition-colors shadow-lg inline-flex items-center gap-2">
              Explore All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-24 bg-navy-50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle 
            title="Legal Insights" 
            subtitle="Read latest articles, opinions, and analyses from our student members and alumni."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} index={index} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/blogs" className="px-8 py-3 border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-semibold rounded-md transition-colors shadow-sm inline-flex items-center gap-2">
              Read All Articles
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Ready to Join The Advocates\\' League?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Take the next step in your legal education. Connect with peers, participate in events, and build your professional network.
            </p>
            <Link to="/contact" className="w-full sm:w-auto px-10 py-4 bg-gold-600 hover:bg-gold-500 text-white text-lg font-bold rounded-md transition-colors shadow-lg hover:shadow-gold-500/30 inline-block">
              Become a Member Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
