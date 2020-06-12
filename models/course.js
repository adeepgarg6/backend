const mongoose = require('mongoose')


const courseSchema=new mongoose.Schema({
    id:{
        type: String,
        required: true,
        trim: true
    },
    name:{
        type: String,
        //required: true,
        trim: true
    },
    provider:{
        type: String,
        //required: true,
        trim: true
    },
    university:{
        type: String,
        //required: true,
        trim: true
    },
    parentSub:{
        type: String,
        //required: true,
        trim: true
    },
    childSub:{
        type: String,
        //required: true,
        trim: true
    },
    url:{
        type: String,
        //required: true,
        trim: true
    },
    nextSession:{
        type: String,
        //required: true,
        trim: true
    },
    length:{
        type: String,
        //required: true,
        trim: true
    },
    video:{
        type: String,
        //required: true,
        trim: true
    }
});

const Course = mongoose.model('Course', courseSchema)

module.exports = Course