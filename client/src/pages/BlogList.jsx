import { useQuery } from '@tanstack/react-query'
import { getBlogs } from '../api/index'
import { Link } from 'react-router-dom'

const demoBlogs = [
  { _id: '1', title: 'Getting Started with MERN Stack', excerpt: 'A beginner guide to building full stack apps.', date: '2024-01-10' },
  { _id: '2', title: 'JWT Authentication in Node.js', excerpt: 'How to secure your APIs with JSON Web Tokens.', date: '2024-02-15' },
]

export default function BlogList() {
  const { data } = useQuery({ queryKey: ['blogs'], queryFn: getBlogs, retry: false })
  const blogs = data?.data || demoBlogs

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Blog</h1>
      <div className="flex flex-col gap-6">
        {blogs.map(b => (
          <Link to={`/blog/${b._id}`} key={b._id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <p className="text-sm text-gray-400 mb-1">{new Date(b.date).toDateString()}</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{b.title}</h2>
            <p className="text-gray-600">{b.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}