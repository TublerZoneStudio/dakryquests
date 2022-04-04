const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')  
const BillboardMessage = require('../models/BillboardMessage')
const auth = require('../middleware/auth.middleware')
const router = Router()  
const moment = require('moment')

router.post('/generate', auth, async (req, res) => {
  try {
    const {title, desc, owner_nickname} = req.body

	const calendar = moment().subtract(10, 'days').calendar()
	const PM = moment().format('LT');
	
	const create_date = `${calendar}. ${PM}`
 
    const message = new BillboardMessage({
		title, desc, owner_nickname, owner: req.user.userId, create_date
    }) 
 
    await message.save()

    res.json(message)
  } catch (e) {
		res.status(500).json({ message: e }) 
  }
})

router.get('/fetch-messages',auth, async (req, res) => {
	try { 
		const messages = await BillboardMessage.find({ status: true })
		
		return res.json( messages )
	} catch (e) {
		res.status(500).json({ message: e }) 
	}
})

module.exports = router