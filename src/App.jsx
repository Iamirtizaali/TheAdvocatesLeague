import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import SubSections from './pages/SubSections'
import SubSectionDetail from './pages/SubSectionDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sections" element={<SubSections />} />
          <Route path="/sections/:slug" element={<SubSectionDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
