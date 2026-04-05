import Blog from '../models/Blog.js'

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 })
    res.json(blogs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    res.json(blog)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.status(201).json(blog)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: 'Blog deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}