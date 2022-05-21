const {Schema, model, Types} = require('mongoose')

const schema = new Schema({ 
	title: {type: String, default: "Без названия"},
	description: {type: String, default: "Без описания"},
	ownerId: {type: Types.ObjectId, ref: 'User'},
	date: {type: String, default: Date.now},
	status: {type: Boolean, default: true}
})

module.exports = model('BillboardMessage', schema)