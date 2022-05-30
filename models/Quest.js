const { Schema, model, Types } = require('mongoose')

const schema = new Schema ({
	title: {type: String, default: "Без названия"},
	description: {type: String, default: "Без описания"},
	banner: {type: String, default: "Без баннера"},
	price: {type: Number, default: "Беслатный"},
	startsIn: {type: String, default: "Не указано"},
	endsIn: {type: String, default: "Не указано"},
	status: {type: Boolean, default: true},
	themes: {type: Array, default: []},
	feedbacks: {type: Array, default: []}
})

module.exports = model('Quest', schema)