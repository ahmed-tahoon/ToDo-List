const express = require("express")
const bodyParser = require('body-parser')
const app = express();
const database = require('./config/db')
const Item = require("./model/itemScema")
const List = require("./model/listSchema")

 var day  = new Date();
   var option = {
       weekday:"long",
       day : "numeric",
       month : "long"
   }


   var Today = day.toLocaleDateString('en-us',option)
   
var items =[];

app.set('view engine' , 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}))



app.get("/",(req,res)=>{

  
   
 Item.find({},(err,item)=>{

    
 res.render("list",{
       day : Today,
       items : item
   })
  

})

})

app.post("/delete",(req,res)=>{
    
    var v = req.body.check
    var listName = req.body.list_title;

    if(listName==Today){
    Item.findByIdAndRemove(v,(err)=>{
        if(!err){
        console.log("Successfully Deleted")
            res.redirect("/")
        }
    }) 

}
else
{
List.findOneAndUpdate({name : listName} , {$pullAll : [{items:{ _id : v}}]},{ new: true },(err,item)=>{
          if(!err)
          {
              console.log("fsdf")
              res.redirect("/"+listName)
          }
          else
          console.log(err)
      })


}
})

app.post("/",(req,res)=>{
    
    var newitem = req.body.to;
    var listName = req.body.listTitle;
     const newI = new Item({
         name:newitem
     })
    

     if(listName==Today){
     newI.save();
     res.redirect("/")
     }
     else
     {
         List.findOne({name:listName} , (err,item)=>{
             item.items.push(newI);
             item.save();
             res.redirect("/"+listName) 
         })
     }



})

app.get("/:target",(req,res)=>{

    const target = req.params.target

   List.findOne({name : target} , (err,item)=>{
       if(!err)
       {
           if(!item)
           {
               const list  = new List({
                   name : target
             })

             list.save();
             res.redirect('/'+target)
           }
           else
           {
       res.render("list",{
       day : target,
       items : item.items   
       })
           }
       }
       else
       {
           res.redirect("/")
       }
   })






})

app.listen(6000,()=>{
    console.log('Server Work 3000')
})