const mongoose = require('mongoose')
const shortid = require('shortid')

const schema = new mongoose.Schema({
  code:{
    type:String,
    default:shortid.generate,
    required:true
  },
  users:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  messages:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Message'
  }]
})

schema.set('toJSON',{
  virtuals: true,
  versionKey:false,
  transform:(_,ret)=>{
    delete ret._id
  }
})

const ChatRoom = new mongoose.model('ChatRoom',schema)

module.exports = ChatRoom