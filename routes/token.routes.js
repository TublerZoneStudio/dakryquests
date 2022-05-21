const {Router} = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = Router()
const auth = require('../middleware/auth.middleware')
const AuthToken = require('../models/AuthToken')

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')  

    const {token} = req.body
	
    const const_token = new AuthToken({
      token, owner: req.user.userId
    }) 
 
    await const_token.save() 

    const tokens = await AuthToken.find({ owner: req.user.userId })

    res.status(201).json(tokens)
  } catch (e) {
		res.status(500).json({ message: e }) 
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const tokens = await AuthToken.find({ owner: req.user.userId })
    res.status(200).json(tokens)
  } catch (e) {
    res.status(500).json({ message: e })
  }
}) 

router.get('/gettoken/:id', async (req, res) => {
  try {
	  
    const token = await AuthToken.findOne({ _id: req.params.id })
	
    return res.status(200).json(token)
  } catch (e) { 
    res.status(500).json({ message: e })
  }
})

router.get('/delete/:id', auth, async (req, res) => {
  try {
    await AuthToken.deleteOne({ _id: req.params.id })

    const tokens = await AuthToken.find({ owner: req.user.userId })

    return res.json(tokens)
  } catch(e) {
    res.status(500).json({ message: e })
  }
})

router.post('/updatetoken/:id', auth, async (req, res) => {
  try {
	 const {type} = req.body
	 
    const token = await AuthToken.findByIdAndUpdate(req.params.id,{"token_type": type})

    const tokens = await AuthToken.find({ owner: req.user.userId })
	
    return res.status(200).json(tokens)
  } catch (e) { 
    res.status(500).json({ message: e })
  }
})

router.post('/check', async (req, res) => {
  try {
	const {token} = req.body
	
	const isToken = await AuthToken.findOne({ token  })

	if(!isToken){
		return res.status(400).json({ message: "Not Found" })
	}
		
	res.status(200).json({ isToken })
  } catch (e) {
    res.status(500).json({ message: e })
  }
}) 


module.exports = router