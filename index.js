import express from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import router from './routes/api.js';
import dotenv from 'dotenv';


//set up express app
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION; 

mongoose
  .connect( CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })  
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));


mongoose.set("useFindAndModify", false);

app.use(express.static('public'));


app.use(bodyParser.json); 


//initializing routes
app.use('/api',router);

//error handeling middleware
app.use((err,req,res,next)=>{

  //console.log(err);
  res.status(422).send({
    error:err.message
  });
});


