const {Schema, model, Types} = require('mongoose')

const schema = new Schema({ 
	token: {type: String, required: true},
	status: {type: Boolean, default: true},
	owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('AuthToken', schema)