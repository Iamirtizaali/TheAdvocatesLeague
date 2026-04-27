import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-subtle flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gold-600">
          <Scale size={48} />
        </div>
        <h1 className="text-6xl font-serif font-bold text-navy-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-gold-600 hover:bg-gold-500 text-white font-semibold rounded-md transition-colors shadow-lg inline-block"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  )
}
