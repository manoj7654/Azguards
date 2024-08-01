const express = require('express');
const bodyParser = require('body-parser');
const {connection}=require("./config/db");
const { userRouter } = require('./routes/userRouter');
const swaggerRouter = require('./swagger');
const todoRouter = require('./routes/todoRouter');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.send("Welcome to the Todo  API")
})



app.use("/",userRouter)
app.use("/todos",todoRouter)
app.use(swaggerRouter)
app.use(errorHandler)
connection.sync({ force: false }) 
  .then(() => {
    console.log('Database & tables created!');
  });

app.listen(process.env.port,async()=>{
    try {
        console.log(`Server is listening on port no ${process.env.port}`)
    } catch (error) {
        console.log("Getting Error while running server")
    }
  
})

