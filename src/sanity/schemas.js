// Sanity Schemas for The Advocates\\' League
// You can use these in your separate Sanity Studio project.

export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'siteTitle', title: 'Site Title', type: 'string' },
    { name: 'logo', title: 'Site Logo', type: 'image' },
    { name: 'seoDescription', title: 'Default SEO Description', type: 'text' },
  ],
}

export const homePage = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    { name: 'heroTitle', title: 'Hero Title', type: 'string' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' },
    { name: 'heroImages', title: 'Hero Background Images (Slider)', type: 'array', of: [{ type: 'image' }] },
    { name: 'missionStatement', title: 'Mission Statement', type: 'text' },
    { name: 'visionStatement', title: 'Vision Statement', type: 'text' },
  ],
}

export const aboutPage = {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    { name: 'aboutText', title: 'About Description', type: 'text' },
    { name: 'whoWeAre', title: 'Who We Are', type: 'text' },
    { name: 'coreValues', title: 'Core Values', type: 'array', of: [{ type: 'object', name: 'coreValueItem', fields: [{name: 'title', type: 'string'}, {name: 'description', type: 'text'}] }] },
    { name: 'objectives', title: 'Society Objectives', type: 'array', of: [{ type: 'string' }] },
    { name: 'history', title: 'History', type: 'text' },
    { name: 'journeyText', title: 'Our Journey', type: 'text' },
  ]
}

export const teamMember = {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role/Designation', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Bio', type: 'text' },
    { name: 'order', title: 'Order/Rank', type: 'number' },
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    { name: 'facebook', title: 'Facebook URL', type: 'url' },
    { name: 'instagram', title: 'Instagram URL', type: 'url' },
  ],
  orderings: [
    { title: 'Rank', name: 'rankAsc', by: [{ field: 'order', direction: 'asc' }] }
  ]
}

export const subsection = {
  name: 'subsection',
  title: 'Sub Section (PULC, Chapter, Embassy)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'image', title: 'Cover Image', type: 'image' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'content', title: 'Detailed Content', type: 'array', of: [{type: 'block'}, {type: 'image'}] },
    { name: 'order', title: 'Order', type: 'number' },
  ]
}

export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Event Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'date', title: 'Event Date', type: 'datetime' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'image', title: 'Event Image', type: 'image' },
    { name: 'description', title: 'Short Description', type: 'text' },
    { name: 'content', title: 'Event Details', type: 'array', of: [{type: 'block'}, {type: 'image'}] },
    { name: 'gallery', title: 'Event Image Gallery', type: 'array', of: [{ type: 'image' }] },
    { name: 'tags', title: 'Tags', type: 'array', of: [{type: 'string'}] },
  ]
}

export const blog = {
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'image', title: 'Cover Image', type: 'image' },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}, {type: 'image'}] },
    { name: 'category', title: 'Category', type: 'string' },
  ]
}

export const gallery = {
  name: 'gallery',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title/Caption', type: 'string' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'eventRef', title: 'Related Event', type: 'reference', to: [{type: 'event'}] },
  ]
}

export const announcement = {
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'active', title: 'Is Active?', type: 'boolean' },
    { name: 'link', title: 'Optional Link', type: 'url' },
  ]
}

export const achievement = {
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'date', title: 'Date Achieved', type: 'date' },
    { name: 'image', title: 'Image (Optional)', type: 'image' },
  ]
}

export const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role/Alumni Batch', type: 'string' },
    { name: 'quote', title: 'Quote', type: 'text' },
    { name: 'image', title: 'Image', type: 'image' },
  ]
}

export const faq = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string' },
    { name: 'answer', title: 'Answer', type: 'text' },
  ]
}

export const contactInfo = {
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    { name: 'email', title: 'Email Address', type: 'string' },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'address', title: 'Physical Address', type: 'text' },
    { name: 'instagram', title: 'Instagram URL', type: 'url' },
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    { name: 'facebook', title: 'Facebook URL', type: 'url' },
    { name: 'twitter', title: 'Twitter URL', type: 'url' },
  ]
}

export const schemaTypes = [
  siteSettings,
  homePage,
  aboutPage,
  teamMember,
  subsection,
  event,
  blog,
  gallery,
  announcement,
  achievement,
  testimonial,
  faq,
  contactInfo
]
