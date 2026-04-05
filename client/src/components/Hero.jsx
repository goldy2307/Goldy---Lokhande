import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-blue-600 font-medium mb-3 text-lg">
          Hi, I'm
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
          Goldy Lokhande
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl text-gray-500 font-medium mb-6">
          Full Stack Developer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 text-lg max-w-xl mb-8">
          I build scalable, performant web applications with modern technologies. Passionate about clean code and great user experiences.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4 flex-wrap">
          <a href="#projects" className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition">
            View Projects
          </a>
          <a href="#contact" className="border border-gray-900 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition">
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  )
}