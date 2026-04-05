import Message from '../models/Message.js'
import nodemailer from 'nodemailer'

export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message)
    return res.status(400).json({ message: 'All fields are required' })

  try {
    // Save to DB
    await Message.create({ name, email, message })

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })

    res.status(201).json({ message: 'Message sent successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}