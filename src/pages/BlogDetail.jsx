import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, ArrowLeft, User } from 'lucide-react'
import { client, urlFor } from '../sanity/client'
import { BLOG_BY_SLUG_QUERY } from '../sanity/queries'
import { PortableText } from '@portabletext/react'

export default function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(BLOG_BY_SLUG_QUERY, { slug })
      .then((data) => {
        setBlog(data || {
          title: 'A Deep Dive into Constitutional Frameworks',
          author: 'Jane Doe',
          publishedAt: new Date().toISOString(),
          category: 'Law & Society',
          excerpt: 'A comprehensive study of changing legal paradigms.',
          content: []
        })
      })
      .catch(() => {
        setBlog({
          title: 'A Deep Dive into Constitutional Frameworks',
          author: 'Jane Doe',
          publishedAt: new Date().toISOString(),
          category: 'Law & Society',
          excerpt: 'A comprehensive study of changing legal paradigms.',
          content: []
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

  if (!blog) return <div className="text-center py-20 text-xl font-bold">Article not found</div>

  const imageUrl = blog.image ? urlFor(blog.image).url() : 'https://images.unsplash.com/photo-1505664159854-23285de84815?auto=format&fit=crop&q=80&w=1200'
  const date = new Date(blog.publishedAt || new Date())

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
      <div className="container mx-auto px-4 lg:px-8 pt-12">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-navy-600 hover:text-gold-600 transition-colors mb-8 font-medium">
          <ArrowLeft size={20} /> Back to Blogs
        </Link>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="h-96 relative overflow-hidden">
             <img src={imageUrl} alt={blog.title} className="w-full h-full object-cover" />
             <div className="absolute top-6 left-6 bg-gold-600 text-white px-4 py-1.5 font-bold rounded shadow-md uppercase tracking-wide text-sm">
               {blog.category || 'Law'}
             </div>
          </div>
          
          <div className="p-8 lg:p-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-500 border-b border-gray-100 pb-8 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} className="text-gold-600" />
                <span className="font-medium text-navy-900">{blog.author || 'Author'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gold-600" />
                <span>{date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-justify prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-gold-600 text-gray-700">
              {blog.content && blog.content.length > 0 ? (
                <PortableText value={blog.content} components={components} />
              ) : (
                <>
                  <p className="lead text-xl text-navy-800 mb-6 font-medium">{blog.excerpt}</p>
                  <p>No further detailed content available for this article.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
