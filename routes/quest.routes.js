const {Router} = require('express')
const fileService = require('../services/file-service.js')
const auth = require('../middleware/auth.middleware')
const router = Router() 
const Quest = require('../models/Quest')
const shortid = require('shortid') 
const moment = require('moment')

router.post('/create', auth, async (req, res) => {
  try {
    const {price, title, description, startsIn, endsIn, themes} = req.body

  	const banner = req.files.banner

  	const questBanner = fileService.saveFile(banner)

    const parsedThemes = JSON.parse(themes)

    const quest = await Quest.create({
      banner: questBanner, price, title, description, startsIn, endsIn, themes: parsedThemes
    })

    res.status(200).json(quest)

  } catch (e) {
	 console.log(e)
  }
}) 

router.post('/delete', auth, async(req, res) => {
  try { 
    const { questId } = req.body
    await Quest.deleteOne({ _id: questId })

    res.json({ message: "Квест успешно удален" })
  } catch(e) {
    console.log(e)
  }
})

router.post('/get-by-id', auth, async(req, res) => {
  try {
    const { questId } = req.body 
    const response = await Quest.findById(questId)

    res.json(response)
  } catch(e) {
    console.log(e)
  }
})

router.post('/update-quest-data', auth, async(req, res) => {
  try {
    const { questId, questData } = req.body  
    const response = await Quest.updateOne({_id: questId}, {...questData})

    res.json(response)
  } catch(e) {
    console.log(e)
  } 
})

router.get('/quests', auth, async(req, res) => {
  try {
    const { limit, page } = req.query

    var skip = limit * page

    if(page == -1) {
      skip = 0
    }

    const quests = await Quest.find().limit(limit).skip(skip)

    res.json(quests)
  } catch(e) {
    console.log(e)
  }
})

router.post('/add-feedback', auth, async(req, res) => {
  try {
    const { questId, feedback } = req.body 

    const calendar = moment().subtract(10, 'days').calendar()
    const PM = moment().format('LT')
  
    const date = `${calendar}. ${PM}`

    const feedbackForm = {
      id: shortid.generate(),
      owner: req.user.userId,
      feedback,
      date
    }

    const quest = await Quest.findOneAndUpdate({"_id" : questId},{$push : {"feedbacks" : feedbackForm}})

    res.status(200).json(feedbackForm)
  } catch(e) {
    console.log(e)
  }
})

module.exports = router