import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <img src="https://placehold.co/400x400" alt="Profile" className="rounded-2xl w-full max-w-sm mx-auto shadow-md" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            I'm a passionate Full Stack Developer with experience building end-to-end web applications using the MERN stack.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            I love solving complex problems, learning new technologies, and crafting user-friendly interfaces backed by robust APIs.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer"
              className="text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition font-medium">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="text-blue-600 border border-blue-200 px-4 py-2 rounded-md hover:bg-blue-50 transition font-medium">LinkedIn</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}