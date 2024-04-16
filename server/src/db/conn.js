const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://s1v4h3r3:s1v4h3r3@cluster0.bbrgw22.mongodb.net/youtubeRegistration").then(()=>{
    console.log("mongodb connected successfully")
}).catch((err)=>{
    console.log("Mongodb not connected...")
})

// mongodb+srv://s1v4h3r3:s1v4h3r3@cluster0.bbrgw22.mongodb.net