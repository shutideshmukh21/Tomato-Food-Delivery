import foodModel from "../models/foodModel.js";
import fs from 'fs'

//fs :
// a file system module , enables us to handle and work on files as file exploree
// we can : Read files
// Write
//Dekete , Create 
//There are 2 styles of fs : 
//Synchronous: fs.readFileSync() -- the code execution stops until file operation complete 
// Async : fs.readFile() -- The code execution conyinues with opeartion 

//module : its a single js file or a collection of js code  eg . path , fs
// package : can contain more than one module+ metadataa paxkage. json in node_modules

//add food item

const addFood  =async(req, res)=>{

    let image_filename = `${req.file.filename }`;

    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price: req.body.price,
        image : image_filename,
        category : req.body.category
        

    })
    try{
        await food.save();
        res.json({success: true, message :"Food Added"})
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

    }
        catch(error){
            console.log(error)
            console.log("BODY:", req.body);
            console.log("FILE:", req.file);
            res.json({success: false , message :"Error"})

            

        }
    

}

//listFood
const listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true , data:foods});
    }
    catch(error){
        console.log(error);
        res.json({success:false , message:"Error" })
    }

}

//remove Food Item

const removeFood = async(req,res) =>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`upload/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true , message:"Food Removed"})


    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:"Error"})
    }
}

export {addFood, listFood, removeFood}