const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')  
const Table = require('../models/Table')
const AuthToken = require('../models/AuthToken')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()  
const moment = require('moment')

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')  

    const {
    	title,
    	description,
    	public,
    	table,
    	textAlignment
    } = req.body

    const code = shortid.generate()
		const calendar = moment().subtract(10, 'days').calendar()
		const PM = moment().format('LT');
		const date = `${calendar}. ${PM}`
	 
    const response = await Table.create({
      title, code, date, description, ownerId: req.user.userId, public, table, textAlignment
    }) 
 
    res.status(200).json({ message: "Таблица успешно создана!" })
  } catch (e) {
		res.status(500).json({ message: e }) 
  }
})

router.get('/public-tables', auth, async(req, res) => {
	try {
		const { limit, page } = req.query 

		var skip = limit * page

    if(page == -1) {
      skip = 0
    }

    const tables = await Table.find().limit(limit).skip(skip)

    res.json(tables)

	} catch(e) {
		console.log(e)
	}
})

router.get('/tables', auth, async(req, res) => {
	try {
		const { limit, page } = req.query

		var skip = limit * page

    if(page == -1) {
      skip = 0
    }

    const tables = await Table.find({ownerId: req.user.userId}).limit(limit).skip(skip)

    res.json(tables)

	} catch(e) {
		console.log(e)
	}
})

router.get('/get-all', auth, async (req, res) => {
	try{
		const tables = await Table.find({ public: true })

		res.json(tables)
	} catch(e) {
		console.log(e)
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
    const table = await Table.findById(req.params.id)

    if(table.ownerId == req.user.userId) {
  		await Table.deleteOne({ _id: req.params.id })

  		return res.json('Таблица успешно удалена!')
  	}

  	return res.json('У вас нет доступа к удалению этой таблицы!')
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

router.post('/set-like-status', async (req, res) => {
	try {
		const {likerId, tableId} = req.body

		const table = await Table.findById(tableId)

		const includes = table.likes.includes(likerId)

		if(!includes) {
			table.likes.push(likerId)

			await table.save()

			return res.json(table.likes)
		}

		table.likes.remove(likerId)

		await table.save()

		return res.json(table.likes)

	} catch(e) {
		res.status(500).json({ message: e })
	}
})

router.post(`/update/:id`, auth, async (req, res) => {
	try { 
		const {title, description, public, table, textAlignment} = req.body

		const updated = await Table.findByIdAndUpdate(req.params.id, {
			title, 
			description, 
			public, 
			table, 
			textAlignment
		})

		return res.status(201).json({message: "Таблица успешно обновлена!"})
	}catch (e) {
		res.status(500).json({ message: e })
	}
})

router.post('/add-comment', auth, async (req, res) => {
	try {
		const {tableId, message} = req.body 

		const calendar = moment().subtract(10, 'days').calendar()
		const PM = moment().format('LT');
		const date = `${calendar}. ${PM}`

		const comment = {
			id: shortid.generate(),
			owner: req.user.userId,
			date,
			comment: message,
			answers: [],
			likes: []
		}

		const table = await Table.findById(tableId)

		table.comments.push(comment)

		await table.save()

		res.status(200).json(comment)
	} catch(e) {
		console.log(e)
	}
})

router.post('/add-answer', auth, async (req, res) => {
	try {
		const { tableId, commentId, message } = req.body 

		const calendar = moment().subtract(10, 'days').calendar()
		const PM = moment().format('LT');
		const date = `${calendar}. ${PM}`

		const answer = {
			id: shortid.generate(),
			owner: req.user.userId,
			comment: message,
			date,
			likes: []
		}

		const table = await Table.findOneAndUpdate({"_id" : tableId},{$push : {"comments.$[t].answers" : answer}},{arrayFilters : [{"t.id" : commentId}]})

		res.status(200).json(answer)  
	} catch(e) { 
		console.log(e)
	}
})

router.post('/add-like-to-comment', auth, async (req, res) => {
	try {
		const { tableId, commentId, status } = req.body 

		if(status) {
			const table = await Table.findOneAndUpdate({"_id" : tableId},{$push : {"comments.$[t].likes" : req.user.userId}},{arrayFilters : [{"t.id" : commentId}]})
		} else {
			const table = await Table.findOneAndUpdate({"_id" : tableId},{$pull : {"comments.$[t].likes" : req.user.userId}},{arrayFilters : [{"t.id" : commentId}]})
		}

		res.json(commentId)
	} catch(e) {
		console.log(e) 
	}
})

router.post('/remove-answer', auth, async (req, res) => {
	try {
		const { tableId, commentId, answerId } = req.body 

		const table = await Table.findOneAndUpdate(
			{"_id" : tableId},
			{$pull : {"comments.$[t].answers" : { "id" : answerId }}},
			{arrayFilters : [{"t.id" : commentId}]}
		)

		const tableComments = await Table.findById(tableId)

		res.json(tableComments.comments)
	} catch(e) {
		console.log(e)
	}
})

router.post('/remove-comment', auth, async (req, res) => {
	try {
		const { tableId, commentId } = req.body 

		const table = await Table.findOneAndUpdate(
			{"_id" : tableId},
			{$pull : {"comments" : { "id" : commentId }}}
		)

		res.json(table)
	} catch(e) {
		console.log(e)
	}
})

module.exports = router