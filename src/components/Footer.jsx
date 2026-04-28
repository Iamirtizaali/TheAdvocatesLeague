import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Scale, Mail, Phone, MapPin } from 'lucide-react'
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'
import { client } from '../sanity/client'
import { CONTACT_INFO_QUERY } from '../sanity/queries'

export default function Footer() {
  const [contact, setContact] = useState(null)

  useEffect(() => {
    client.fetch(CONTACT_INFO_QUERY).then(res => {
      if (res) setContact(res)
    }).catch(console.error)
  }, [])

  const info = contact || {
    address: '123 Law University Campus, Legal Avenue, City, State ZIP',
    phone: '+1 (555) 123-4567',
    email: 'contact@advocatesleague.com',
    instagram: '#',
    linkedin: '#',
    twitter: '#',
    facebook: '#'
  }

  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-navy-700 pb-12 mb-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div>
                <img src="/logo.png" alt="Logo" className="w-8 h-8" />
              </div>
              <span className="font-serif font-bold tracking-wide text-xl">The Advocates' League</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              A premier law college society dedicated to nurturing legal minds, fostering dialogue, and building the next generation of legal professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-gold-500 text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Our Team', 'Sub Sections', 'Events', 'Blogs'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-gold-500 text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <MapPin className="text-gold-500 shrink-0 mt-0.5" size={18} />
                <span>{info.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <Phone className="text-gold-500 shrink-0" size={18} />
                <span>{info.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <Mail className="text-gold-500 shrink-0" size={18} />
                <span>{info.email}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif font-semibold text-gold-500 text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to stay updated with our latest events and legal blogs.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-navy-800 border border-navy-700 text-white px-4 py-2 rounded focus:outline-none focus:border-gold-500 text-sm"
              />
              <button className="bg-gold-600 hover:bg-gold-500 text-white font-medium py-2 rounded transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} The Advocates' League. All rights reserved.
          </p>
          <div className="flex gap-4">
            {info.instagram && (
              <a href={info.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-navy-800 text-gray-300 hover:text-white hover:bg-gold-600 transition-all">
                <FaInstagram size={18} />
              </a>
            )}
            {info.facebook && (
              <a href={info.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-navy-800 text-gray-300 hover:text-white hover:bg-gold-600 transition-all">
                <FaFacebook size={18} />
              </a>
            )}
            {info.linkedin && (
              <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-navy-800 text-gray-300 hover:text-white hover:bg-gold-600 transition-all">
                <FaLinkedin size={18} />
              </a>
            )}
            {info.twitter && (
              <a href={info.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-navy-800 text-gray-300 hover:text-white hover:bg-gold-600 transition-all">
                <FaTwitter size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
