import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Lightbulb, Shield, Award } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { client } from '../sanity/client'
import { ABOUT_QUERY } from '../sanity/queries'

export default function About() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    client.fetch(ABOUT_QUERY).then((res) => {
      if (res) setData(res)
    }).catch(console.error)
  }, [])

  const content = data || {
    aboutText: "The Advocates' League is a premier student-run organization dedicated to advancing legal discourse, advocacy skills, and professional development among aspiring law professionals. Established with a vision to bridge the gap between academic learning and practical application, we strive to create a vibrant platform for comprehensive legal education.",
    whoWeAre: "We are a diverse group of passionate individuals united by a shared commitment to excellence in the legal profession.",
    coreValues: [
      { title: 'Mission-Driven', description: 'Focused on impact.' },
      { title: 'Innovative', description: 'Thinking outside the box.' },
      { title: 'Ethical', description: 'Upholding the highest standards.' },
      { title: 'Excellence', description: 'Striving for perfection.' }
    ],
    objectives: [
      "To foster practical legal skills through mooting, negotiation, and drafting competitions.",
      "To cultivate a culture of legal research and academic writing.",
      "To provide networking opportunities with distinguished legal professionals.",
      "To promote awareness about contemporary socio-legal issues."
    ],
    history: "Founded in 2018, The Advocates' League began as a small study circle and has grown into a robust organization with multiple specialized divisions, impacting hundreds of students annually.",
    journeyText: "These pillars guide all our initiatives, events, and programs throughout the academic year."
  }

  return (
    <div className="bg-subtle pb-24">
      <SEO 
        title="About Us | The Advocates' League"
        description="Discover the mission, vision, and core values that drive The Advocates' League, a premier student-run legal organization."
        url="https://theadvocatesleague.in/about"
      />
      {/* Header */}
      <div className="bg-navy-900 py-20 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold mb-4"
        >
          About Us
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-2xl mx-auto px-4 text-lg"
        >
          Discover our mission, vision, and the core values that drive The Advocates' League forward.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              {content.aboutText}
            </p>
            {content.whoWeAre && (
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {content.whoWeAre}
              </p>
            )}
            <div className="w-20 h-1 bg-gold-600"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {(content.coreValues || [
              { title: 'Mission-Driven' },
              { title: 'Innovative' },
              { title: 'Ethical' },
              { title: 'Excellence' }
            ]).map((item, i) => {
              const icons = [Target, Lightbulb, Shield, Award];
              const IconComponent = icons[i % icons.length];
              return (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mb-4">
                  <IconComponent size={24} />
                </div>
                <h3 className="font-serif font-bold text-navy-900">{item.title}</h3>
                {item.description && <p className="text-gray-500 text-sm mt-2">{item.description}</p>}
              </div>
            )})}
          </motion.div>
        </div>

        {/* Objectives Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="bg-navy-900 text-white p-10 lg:p-14 flex flex-col justify-center">
              <h2 className="text-3xl font-serif font-bold mb-4">Our Core Objectives</h2>
              <p className="text-gray-300">
                {content.journeyText || "These pillars guide all our initiatives, events, and programs throughout the academic year."}
              </p>
            </div>
            <div className="col-span-2 p-10 lg:p-14">
              <ul className="space-y-6">
                {(content.objectives || []).map((obj, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 text-lg">{obj}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* History */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center max-w-4xl mx-auto"
        >
          <SectionTitle title="Our Journey" />
          <p className="text-gray-600 leading-relaxed text-lg">
            {content.history}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
