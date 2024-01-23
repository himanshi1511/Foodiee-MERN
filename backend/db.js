
const mongoose = require("mongoose");
const mongo_url =
  "mongodb+srv://Foodie:Himanshi1511@cluster0.4qnxaep.mongodb.net/FoodieMERN?retryWrites=true&w=majority";

const mongodb = async () => {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully...");

    const fetch_food_items = mongoose.connection.db.collection("food_items");
    const items_data = await fetch_food_items.find({}).toArray();
    global.food_items = items_data;
    // console.log(global.food_items);

    const fetch_food_category =
      mongoose.connection.db.collection("food_category");
    const category_data = await fetch_food_category.find({}).toArray();
    global.food_category = category_data;
    // console.log(global.food_category);
  } catch (error) {
    console.error("Error connecting to the database...", error);
  }
};

module.exports = mongodb;
