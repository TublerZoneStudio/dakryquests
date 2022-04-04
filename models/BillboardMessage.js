const {Schema, model, Types} = require('mongoose')

const schema = new Schema({ 
	title: {type: String, default: "Без названия"},
	desc: {type: String, default: "Без описания"},
	comments: {type: Array, default: []},
	status: { type: Boolean, default: true},
	owner_nickname: {type: String},
	owner: {type: Types.ObjectId, ref: 'User'},
	create_date: {type: String, default: Date.now}
})

module.exports = model('BillboardMessage', schema)