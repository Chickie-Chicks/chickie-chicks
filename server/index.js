const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const MenuItem = mongoose.model("MenuItem", new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
}));

const Order = mongoose.model("Order", new mongoose.Schema({
  items: [Object],
  deliveryAddress: String,
  phone: String,
  paymentMethod: String,
  totalAmount: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
}));

const defaultMenu = [
  { name: "Samosa", description: "Crispy fried samosas with spiced filling", price: 15, image: "/images/samosa.jpg" },
  { name: "Fries", description: "Golden and crispy french fries", price: 20, image: "/images/fries.jpg" },
  { name: "Chicken", description: "Spicy grilled chicken pieces", price: 40, image: "/images/chicken.jpg" },
  { name: "Hungarian Sausage", description: "Savory sausage with smoky Hungarian flavor", price: 25, image: "/images/sausage.jpg" },
  { name: "Fruity Kana", description: "Zambian fruity soda", price: 10, image: "/images/fruitykana.jpg" },
  { name: "Fanta Orange", description: "Chilled orange Fanta drink", price: 10, image: "/images/fanta.jpg" },
  { name: "Coca Cola", description: "Classic Coca-Cola soft drink", price: 10, image: "/images/coke.jpg" },
  { name: "Pineapple Fanta", description: "Tropical pineapple flavored Fanta", price: 10, image: "/images/pineapplefanta.jpg" },
  { name: "Mineral Water", description: "Pure bottled mineral water", price: 5, image: "/images/water.jpg" }
];

app.get("/api/menu", async (req, res) => {
  try {
    const menu = await MenuItem.find();
    if (menu.length === 0) {
      await MenuItem.insertMany(defaultMenu);
      return res.json(defaultMenu);
    }
    res.json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
