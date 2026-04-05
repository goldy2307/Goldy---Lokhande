import Skill from '../models/Skill.js'

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
    res.json(skills)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body)
    res.status(201).json(skill)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}