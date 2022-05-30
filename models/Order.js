const { Schema, model, Types } = require('mongoose')

const schema = new Schema ({
	customer: {type: String},
	number: {type: String, required: true},
	questId: {type: String, unique: false, default: "none"},
	date: {type: String, default: Date.now},
	type: {type: String, default: "Простой"},
	code: {type: String, required: true, unique: true},
	status: {type: Boolean, default: false},
	blocked: {type: Boolean, default: false}
})

module.exports = model('Order', schema)