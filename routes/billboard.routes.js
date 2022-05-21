const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')  
const BillboardMessage = require('../models/BillboardMessage')
const auth = require('../middleware/auth.middleware')
const router = Router()  
const moment = require('moment')

router.post('/generate', auth, async (req, res) => {
  try {
    const {title, description, ownerId} = req.body
		const calendar = moment().subtract(10, 'days').calendar()
		const PM = moment().format('LT')
	
		const date = `${calendar}. ${PM}`
 
    const message = new BillboardMessage({
			title,
			description, 
			ownerId, 
			date
    }) 
 
    await message.save()

    res.json(message)
  } catch (e) {
		res.status(500).json({ message: e }) 
  }
})

router.post('/delete', auth, async (req, res) => {
	try {
		const {messageId} = req.body 

		const isOwn = await BillboardMessage.findById(messageId) 

		if(isOwn.ownerId == req.user.userId) {
			await BillboardMessage.deleteOne({ _id: messageId})

			return res.json('Сообщение успешно удалено')
		}

		res.json('Ошибка при удалении')

	} catch(e) {
		res.status(500).json({message: e})
	}
})

router.get('/messages', auth, async (req, res) => {
	try { 
		const messages = await BillboardMessage.find({ status: true })
		
		return res.json( messages )
	} catch (e) {
		res.status(500).json({ message: e }) 
	}
})

module.exports = router