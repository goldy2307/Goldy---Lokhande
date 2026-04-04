import { useState } from 'react'
import { sendMessage } from '../api/index'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await sendMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Get In Touch</h2>
          <p className="text-gray-600 text-center mb-10">Have a project in mind? Let's talk.</p>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" disabled={status === 'sending'}
              className="bg-gray-900 text-white py-3 rounded-md font-medium hover:bg-gray-700 transition disabled:opacity-60">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className="text-green-600 text-sm text-center">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-600 text-sm text-center">Something went wrong. Try again.</p>}
          </form>
        </motion.div>
      </div>
    </section>
  )
}