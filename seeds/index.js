
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require ('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async ()=>{
    await Campground.deleteMany({});
    
    for(let i=0 ; i<50 ;i++){
        //there are 1000 cities in the cities array
        const random1000 =Math.floor(Math.random()*1000);
        const randomdescriptors =Math.floor(Math.random()*descriptors.length);
        const randomplaces =Math.floor(Math.random()*places.length);
        const cmp= new Campground({ 
            title:`${descriptors[randomdescriptors]},${places[randomplaces]}`,
            location:`${cities[random1000].city}, ${cities[random1000].state}`
            
        })
        await cmp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})