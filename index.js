const express = require('express');
const bodyParser = require('body-parser');
const {connection}=require("./config/db");
const { userRouter } = require('./routes/userRouter');
const swaggerRouter = require('./swagger');
// const { categoryRouter } = require('./routes/categoryRouter');
// const productRouter = require('./routes/productRouter');
// const swaggerRouter = require('./swagger');
// const errorHandler = require('./middleware/errorHandler');


require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.send("Welcome to the Todo App API")
})



app.use("/",userRouter)
// app.use("/categories",categoryRouter)
// app.use("/products",productRouter)
app.use(swaggerRouter)
// app.use(errorHandler)
connection.sync({ force: false })  // Set to true to reset the database on every server restart
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

// module.exports=app
