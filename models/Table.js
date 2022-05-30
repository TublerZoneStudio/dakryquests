const {Schema, model, Types} = require('mongoose')
const moment = require('moment')

const schema = new Schema({
	title: {type: String, default: 'Без названия'},
	code: {type: String, required: true, unique: true},
	date: {type: String, default: Date.now},
	description: {type: String, default: 'Без описания'},
	ownerId: {type: Types.ObjectId, ref: 'User'},
	public: {type: Boolean, default: false},
	table: {type: [], required: true},
	textAlignment: {type: 'String', default: 'start'},
	likes: {type: [], default: []},
	comments: {type: [], default: []}
})

module.exports = model('Table', schema)
 