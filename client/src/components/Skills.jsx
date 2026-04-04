import { motion } from 'framer-motion'

const skills = {
  Frontend: ['React', 'JavaScript', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'],
  Database: ['MongoDB', 'Mongoose', 'Firebase'],
  Tools: ['Git', 'VS Code', 'Postman', 'Vercel', 'Render'],
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Skills</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skills).map(([cat, items], i) => (
            <motion.div key={cat}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">{cat}</h3>
              <ul className="flex flex-col gap-2">
                {items.map(skill => (
                  <li key={skill} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}