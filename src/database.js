import mongoose  from "mongoose";

mongoose.connect("mongodb://localhost/myDatadb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(db => console.log('DB conectado'))
    .catch(error => console.log(error) )


