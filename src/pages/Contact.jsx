import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import SEO from '../components/SEO'
import { client } from '../sanity/client'
import { CONTACT_INFO_QUERY } from '../sanity/queries'

export default function Contact() {
  const [contact, setContact] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    
    // Uses Web3Forms for easy form submissions without a backend
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE'
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: `${formData.firstName} ${formData.lastName}`,
          subject: formData.subject || "New Contact Form Submission - The Advocates' League",
          ...formData
        })
      })
      
      const result = await response.json()
      if (result.success) {
        setStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
    }
  }

  useEffect(() => {
    client.fetch(CONTACT_INFO_QUERY)
      .then((data) => {
        if (data) setContact(data)
      })
      .catch(console.error)
  }, [])

  const info = contact || {
    address: 'University Law College University of The Punjab Lahore',
    phone: '03215211478',
    email: 'theadvocatesleaguepu@gmail.com'
  }
  return (
    <div className="bg-subtle min-h-screen pb-24">
      <SEO 
        title="Contact Us | The Advocates' League"
        description="Get in touch with The Advocates' League. We'd love to hear from you."
        url="https://theadvocatesleague.com/contact"
      />
      <div className="bg-navy-900 py-20 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold mb-4"
        >
          Contact Us
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-2xl mx-auto px-4 text-lg"
        >
          Have questions or want to get involved? Reach out to us.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-serif font-bold text-navy-900">Get in Touch</h2>
            <p className="text-gray-600">
              We look forward to hearing from you. Whether you have questions about our upcoming events, want to join a section, or simply want to connect, feel free to reach out.
            </p>
            
            <div className="space-y-6 mt-8">
              <div className="flex flex-start gap-4">
                <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-lg">Address</h3>
                  <p className="text-gray-600">{info.address}</p>
                </div>
              </div>
              
              <div className="flex flex-start gap-4">
                <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-lg">Phone</h3>
                  <p className="text-gray-600">{info.phone}</p>
                </div>
              </div>
              
              <div className="flex flex-start gap-4">
                <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-lg">Email</h3>
                  <p className="text-gray-600">{info.email}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Form UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">Send a Message</h2>
            {/* Note: Requires VITE_WEB3FORMS_ACCESS_KEY in .env */}
            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="font-bold text-lg">Message Sent!</h3>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="text-gold-600 font-semibold hover:underline mt-2">Send another message</button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {status === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                    There was an error sending your message. Please try again later.
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 bg-gray-50 flex-1" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 bg-gray-50 flex-1" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 bg-gray-50 flex-1" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Subject</label>
                  <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 bg-gray-50 flex-1" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 bg-gray-50 flex-1 resize-none" placeholder="Your message here..."></textarea>
                </div>
                <button disabled={status === 'submitting'} type="submit" className="w-full py-4 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-md transition-colors flex justify-center items-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === 'submitting' ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
