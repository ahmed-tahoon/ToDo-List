const mongoose = require('mongoose');
url="mongodb+srv://ahmed:ahmed12345@cluster0.cgzzj.mongodb.net/fdffd?retryWrites=true&w=majority";


mongoose.connect(url , (err)=>{
if (err)
{
    console.log("error")
}
else
{
    console.log("connected Success")
}

} )