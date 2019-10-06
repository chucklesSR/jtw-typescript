import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/test',{
    useNewUrlParser     : true,
    useUnifiedTopology  : true,
    useCreateIndex: true
})
.then(db => console.log('database is conected'))
.catch(err => console.log(err))