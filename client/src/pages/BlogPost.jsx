import { useParams, Link } from 'react-router-dom'

export default function BlogPost() {
  const { id } = useParams()
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <Link to="/blog" className="text-blue-600 hover:underline text-sm mb-8 inline-block">← Back to Blog</Link>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post #{id}</h1>
      <p className="text-gray-600 leading-relaxed">Blog content will be fetched from the API once your backend is ready.</p>
    </section>
  )
}