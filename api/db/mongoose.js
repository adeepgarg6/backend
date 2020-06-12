const mongoose = require('mongoose')
const url='mongodb+srv://ankit:8196044188@cluster0-f5vu7.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})