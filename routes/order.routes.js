const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router() 
const Order = require('../models/Order')
const shortid = require('shortid') 
const moment = require('moment')

router.post('/create', auth, async(req, res) => {
	try {
		const {questId, customer, type, number} = req.body 
		const calendar = moment().subtract(10, 'days').calendar()
		const PM = moment().format('LT');
		const date = `${calendar}. ${PM}`
		const code = shortid.generate()

		await Order.create({ 
			questId, customer, type, date, code, number
		})
		
		res.status(200).json()
	} catch(e) {
		console.log(e)
	}
})

router.post('/delete-by-questid', auth, async(req, res) => {
	try {
		const {questId} = req.body 

		await Order.deleteMany({questId})

		res.status(200).json()
	} catch(e) {
		console.log(e)
	}
})

router.post('/get-user-orders', auth, async(req, res) => {
	try {
		const {id} = req.body 

		const orders = await Order.find({customer: id})

		res.json(orders)
	} catch(e) {
		console.log(e)
	}
})

router.get('/get-all', auth, async(req, res) => {
	try {
		const orders = await Order.find()

		res.json(orders)
	} catch(e) {
		console.log(e)
	}
})

router.post('/block-order', auth, async(req, res) => {
	try {
		const {id, bool} = req.body 

		const order = await Order.findOneAndUpdate({_id: id}, {blocked: bool})

		bool 
			?
			res.json({ message: "Заявка успешно заблокирована"})
			:
			res.json({ message: "Заявка успешно разблокирована"})
	} catch(e) {
		console.log(e)
	}
})

router.post('/approve-order', auth, async(req, res) => {
	try {
		const {id, bool} = req.body 

		const order = await Order.findOneAndUpdate({_id: id}, {status: bool})

		res.json({ message: "Заявка успешно одобрена"})
	} catch(e) {
		console.log(e)
	}
})

module.exports = router