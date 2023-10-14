const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  text: {
    type: String,
    required: ()=>this.file
  },
  file:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'File',
    required:()=>this.text
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  chatRoomId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'ChatRoom'
  }

},{ timestamps: true })

schema.set('toJSON',{
  versionKey:false,
  virtuals:true,
  transform:(doc,ret)=>{
    delete ret._id
  }
})

const Message = new mongoose.model('Message', schema)

module.exports = Message

