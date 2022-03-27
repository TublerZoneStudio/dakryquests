const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const AuthToken = require('../models/AuthToken')
const auth = require('../middleware/auth.middleware')

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Введены некорректные данные!'
      })
    }

    const {email, nickname, password, auth_token} = req.body
	
	const isToken = await AuthToken.findOne({ token: auth_token })
	
	if(!isToken){
		return res.status(500).json({ message: "Токен не найден!" })
	}
	
	if(!isToken.status){
		return res.status(400).json({ message: "Токен не найден!" })
	} 
	
	const token_id = isToken._id
	
	await AuthToken.findByIdAndUpdate(token_id,{status: false})

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует!' })
    }
 
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, nickname, password: hashedPassword })
	
    await user.save()

    res.status(201).json({ message: 'Пользователь создан!' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post(
	'/login',
	[
		check('email', 'Enter correct email').normalizeEmail().isEmail(),
		check('password',	'Enter password').exists()
	],
	async(reg, res) => {
	try{
		const errors = validationResult(reg)
		
		if(!errors.isEmpty()){
			return res.status(400).json({
				errors: errors.array(),
				message: "Введены некорректные данные!"
			})
		}
		
		const {email, password} = reg.body
		
		const user = await User.findOne({ email })
		
		if (!user){
			return res.status(400).json({ message: "Пользователь не найден!" }) 
		}
		
		const isMatch = await bcrypt.compare(password, user.password)
		
		if(!isMatch){
			return res.status(400).json({ message: "Введены некорректные данные" })
		}
		
		const token = jwt.sign(
			{userId: user.id},
			config.get('jwtSecret'),
			{ expiresIn: '1h'}
		)
		
		res.json({token, userId: user.id})		
		

	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так. Попробуйте снова" })
	}
})

router.get('/getnickname', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId })
    res.json(user)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})


module.exports = router