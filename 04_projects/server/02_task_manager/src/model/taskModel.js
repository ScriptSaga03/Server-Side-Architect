import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  description:{
    type:String,
    trim:true,
    maxLength:500,
    default:"",
  },
  status:{
    type:String,
    enum:['pending','in-progress','completed'],
    default:'pending'
  },
  priority:{
    type:String,
    enum:['low','medium','high'],
    default:'medium'
  },
  dueDate:{
    type:Date,
    default:null
  }
},{timestamps:true});


const Task = mongoose.model('Tasks', taskSchema);


export default Task;
