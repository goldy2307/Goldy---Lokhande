import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../api/index'
import { motion } from 'framer-motion'

const demoProjects = [
  { _id: '1', title: 'E-Commerce App', description: 'Full stack store with cart, auth and payments.', techStack: ['React', 'Node', 'MongoDB'], githubUrl: '#', liveUrl: '#' },
  { _id: '2', title: 'Blog Platform', description: 'CMS-style blog with markdown support and admin panel.', techStack: ['React', 'Express', 'MongoDB'], githubUrl: '#', liveUrl: '#' },
  { _id: '3', title: 'Task Manager', description: 'Kanban board with drag-and-drop and real-time updates.', techStack: ['React', 'Socket.io', 'Node'], githubUrl: '#', liveUrl: '#' },
]

export default function Projects() {
  const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: getProjects, retry: false })
  const projects = data?.data || demoProjects

  return (
    <section id="projects" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Projects</h2>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div key={p._id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.techStack.map(t => (
                    <span key={t} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={p.githubUrl} target="_blank" rel="noreferrer"
                    className="text-sm font-medium text-gray-700 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition">GitHub</a>
                  <a href={p.liveUrl} target="_blank" rel="noreferrer"
                    className="text-sm font-medium text-white bg-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-700 transition">Live</a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}