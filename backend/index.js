const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const mongoDB = require("./db")
mongoDB();


app.use(cors(
  {
    origin: ["https://deploy-mern-foodapp.vercel.app"],
    methods : ["POST" , "GET"],
    credentials: true
  }
));
app.use((req , res , next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.use(express.json())
app.use('/api' , require("./Routes/CreateUser"));
app.use('/api' , require("./Routes/DisplayData"));
app.use('/api' , require("./Routes/OrderData"));


app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


