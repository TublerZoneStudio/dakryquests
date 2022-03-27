const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')  
const Table = require('../models/Table')
const AuthToken = require('../models/AuthToken')
const auth = require('../middleware/auth.middleware')
const router = Router()  
const moment = require('moment')

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')  
    const {thead, tbody, ttitle, tdesc} = req.body
    const code = shortid.generate()
	
	const calendar = moment().subtract(10, 'days').calendar()
	const PM = moment().format('LT');
	
	const date = `${calendar}. ${PM}`
	
    const title = ttitle
	
	const desc = tdesc
 
    const table = new Table({
      code, title, thead, tbody, date, desc, owner: req.user.userId
    }) 
 
    await table.save()

    res.status(201).json({ table })
  } catch (e) {
		res.status(500).json({ message: e }) 
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const tables = await Table.find({ owner: req.user.userId })
    res.json(tables)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const table = await Table.findById(req.params.id)
    res.json(table)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})
router.get('/delete/:id', auth, async (req, res) => {
  try {
    const table = await Table.deleteOne({ _id: req.params.id })
	
	return res.json({ message: "Таблица успешно удалена!" })
	
  } catch (e) {
    res.status(500).json({ message: e })
  }
})
router.post('/update/:id', auth, async (req, res) => {
	try {
		const {new_thead, new_tbody, new_ttitle, new_tdesc} = req.body
		const table = await Table.findByIdAndUpdate(req.params.id,{"thead": new_thead,"tbody": new_tbody, "title": new_ttitle,"desc": new_tdesc})
	}catch (e) {
		res.status(500).json({ message: e })
	}finally{
		return res.json({ message: "succesfully updated!" })
	}
})

module.exports = router