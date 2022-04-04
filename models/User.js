const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	email: {type: String, required: true, unique: true},
	nickname: {type: String, required: true},
	password: {type: String, required: true},
	user_status: {type: String, default: "participant"},	
	tokens: {type: Number, default: 0},
	tables: [{ type: Types.ObjectId, ref: "Table"}]
})

module.exports = model('User', schema)