import express from 'express';
import mongoose from 'mongoose';
import data from './data.js'
import Videos from './dbModel.js'

// app config 
const app=express();
const port = 9000;

//middle ware needed to parse json body 

app.use(express.json())
app.use((req,res,next) => {
    // setting the response headers for open cors access 
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();

})
// db config 

// const connection_url = 'mongodb+srv://si3mshady:<pw>@cluster0.vho6c.mongodb.net/tiktokclone?retryWrites=true&w=majority'
const connection = "mongodb://db:27017/jl";
// const connection = "mongodb://mongodb/jl";
mongoose.connect(connection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// run initially to populate database which is mounted locally 
// record = json object 


data.forEach(record => {

    Videos.create(record, (err, data) => {
        if (!err) {          
            console.log('Entry successful')
         
            console.log(record)        

        } else {
            console.log('Entry unsuccessful')
        }
    })

})

app.get('/', (req,res) => {
    res.status(200).send('Hello world')
})


app.get('/v1/posts', (req, res) => {
    res.status(200).send(data)})

app.get('/v2/posts', (req,res) => {
    Videos.find((err,data) => {
        if (!err) {
            console.log(typeof(data))
            
            console.log(data)    
                            
            // 201 -> created 
            res.status(201).send(data)
            

        } else {
            console.log(err)
            res.status(500).send(err)
        }

        
    } )
})


app.post('/v2/posts', (req,res) => {
    
    const dbVideos = req.body


    Videos.create(dbVideos, (err, data) => {
        if (!err) {
            // 201 -> created 
            console.log(data)
            console.log(data.length)
            res.status(201).send(data)

        } else {
            res.status(500).send(err)
        }
    })
} )

app.listen(port, () => console.log(`Listening on port : ${port}`))


