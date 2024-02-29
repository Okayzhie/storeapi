require('dotenv').config();
//async error
require('express-async-errors')

const connectDB = require('./db/connect')
const productRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const express = require('express');
const app = express();
//middleware
app.use(express.json())

app.get('/',(req,res)=> {
    res.send('<h1>tdk store<h1>')
})
app.use('/api/v1/products' , productRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        //connectDB
        app.listen(port,console.log(`server is running on ${port} ...`))
    } catch (error) {
        console.log(error);
    }
}
start()