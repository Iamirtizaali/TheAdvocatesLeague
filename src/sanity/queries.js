export const HOME_QUERY = `*[_type == "homePage"][0]`
export const ABOUT_QUERY = `*[_type == "aboutPage"][0]`
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`
export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember"] | order(order asc)`
export const SUBSECTIONS_QUERY = `*[_type == "subsection"] | order(order asc)`
export const SUBSECTION_BY_SLUG_QUERY = `*[_type == "subsection" && slug.current == $slug][0]`
export const EVENTS_QUERY = `*[_type == "event"] | order(date desc)`
export const EVENT_BY_SLUG_QUERY = `*[_type == "event" && slug.current == $slug][0]`
export const BLOGS_QUERY = `*[_type == "blog"] | order(publishedAt desc, _createdAt desc)`
export const BLOG_BY_SLUG_QUERY = `*[_type == "blog" && slug.current == $slug][0]`
export const GALLERY_QUERY = `*[_type == "gallery"]`
export const CONTACT_INFO_QUERY = `*[_type == "contactInfo"][0]`
export const FAQ_QUERY = `*[_type == "faq"]`
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"]`
export const ANNOUNCEMENTS_QUERY = `*[_type == "announcement" && active == true]`
