import express from "express"
import cors from"cors"
import { connect_Db } from "./Config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

//iKYIOR6qKcF2AFXh
//rdsoham5_db_user

//mongodb+srv://rdsoham5_db_user:iKYIOR6qKcF2AFXh@clusterfooddelivery.iv7bnov.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFoodDelivery

//103.215.148.68/32 - ip address to access database  - this allows ony one ipp adress to access ur db
//0.0.0.0/0 - enables to access the aip address from anywre - this allows all the ip addresses to access uer db 


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