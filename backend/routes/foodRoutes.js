// import express from 'express'
// import { addFood } from '../controllers/foodControler'
// import multer from 'multer'

// //multer : Node.js middlewarer ...use to uploaddf files to the server 
// // Express dint handle file uploads (it only handle json, url-based data easily)
// //file up,loads require special parsing ..bcoz browser send thenm as binary data ..thus mutlter provides that parsing 

// // -- we define storage location , tell multer which field of form are files , multer saves the 
// uploaded files to server and make details available to route handler.

// const foodRouter = express.Router();

// //image storage engine ...diskStora - stores file in our coputer,memoryStorage
// // stores in RAM
//  const storage = multer.diskStorage({destination :"upload" , filename :(req , file , cb)=>{
//     return cb(null, `${Date.now()} ${file.originalname}`) // in this method our filename become unique
//  }})

//  const upload = multer({storage:storage }) // created a middleware 


//  foodRouter.post("/add",upload.single("image"), addFood)

// // here whener post request is made with form ..

// // upload.single()..will rune :
//        // which parses multipart / orm data 
//        // saves the image to upload folder
//        // populate req.file and req. body ..which can be accessd by addFood controler

// // addFood runs:
//       // uses req.body 
//       // req.file to store data in db 
//       // sens response back 



// export default foodRouter;

import express from "express";
import multer from "multer";
import { addFood , listFood , removeFood, searchFood } from "../controllers/foodControler.js";

const foodRouter = express.Router();

// Storage configuration
const storage = multer.diskStorage({
  destination: "upload",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// Multer middleware
const upload = multer({ storage: storage });

// Route to add food
foodRouter.post("/add", upload.single("image"), addFood); // 

//Route to list the foood 
foodRouter.get("/list", listFood);

//Route to delete food item

foodRouter.post("/remove", removeFood);

foodRouter.get("/search", searchFood);

export default foodRouter;

