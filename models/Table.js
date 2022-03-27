const {Schema, model, Types} = require('mongoose')
const moment = require('moment')

const schema = new Schema({
  thead: {type: []},
  title: {type: String},
  code: {type: String, required: true, unique: true},
  date: {type: String, default: Date.now},
  desc: {type: String, default: "Без описания"},
  tbody: {type: []},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Table', schema)