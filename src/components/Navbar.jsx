import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Scale } from 'lucide-react'
import { cn } from '../utils/cn'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Sub Sections', path: '/sections' },
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-navy-900/40 backdrop-blur-sm py-5"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className={cn(
            "p-2 rounded-lg transition-colors",
            scrolled ? "bg-navy-900 text-gold-500" : "bg-gold-500 text-navy-900"
          )}>
            <Scale size={24} className="group-hover:scale-110 transition-transform" />
          </div>
          <span className={cn(
            "font-serif font-bold text-xl md:text-2xl tracking-wide",
            scrolled ? "text-navy-900" : "text-white"
          )}>
            The Advocates\\' League
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "font-medium text-sm lg:text-base transition-colors hover:text-gold-500",
                location.pathname === link.path 
                  ? "text-gold-500 font-semibold" 
                  : scrolled ? "text-gray-700" : "text-gray-100"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-medium rounded-md transition-colors shadow-lg hover:shadow-gold-500/30"
          >
            Join Us
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-gold-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-xl overflow-hidden border-t border-gray-100"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={cn(
                    "text-lg font-medium p-2 border-b border-gray-50",
                    location.pathname === link.path ? "text-gold-600" : "text-navy-900"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/contact" 
                className="mt-4 text-center px-5 py-3 bg-navy-900 text-gold-500 font-bold rounded-lg"
              >
                Become a Member
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
