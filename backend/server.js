import express from "express"
import cors from"cors"
import { connect_Db } from "./Config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";




// app config

const app = express();
const port = process.env.PORT || 4000;


//middleware 
//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));   // ⭐ ADD THIS ⭐
app.use(cors());

 //db connection 

 connect_Db();

 //api endpoint
 app.use("/api/food", foodRouter)
 app.use("/images", express.static('upload')) // i mounted the upload folder on the /image route ..mow i can access image as 
app.use("/api/user" , userRouter)     
app.use("/api/cart",cartRouter)    
app.use("/api/order",orderRouter);  
                               //http://localhost:4000 /images/file_name .. that we have decided 
 

app.get("/", (req, res)=>{res.send("API working")})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});  