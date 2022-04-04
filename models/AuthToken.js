const {Schema, model, Types} = require('mongoose')

const schema = new Schema({ 
	token: {type: String, required: true},
	token_type: {type: String, default: "participant"},
	status: {type: Boolean, default: true},
	owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('AuthToken', schema)